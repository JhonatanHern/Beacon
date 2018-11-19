/*
	App constants
*/
var APP_ID = App.DNA.Hash,
	ME = App.Key.Hash

function isValidEntryType (entryType) {
	// Add additonal entry types here as they are added to dna.json.
	switch(entryType){
		case 'link':
		case 'action':
		case 'petition':
		case 'opinion':
		case 'profile':
		case 'history_entry':
		case 'comment':
		case 'tag':
		case 'track':
		case 'episode':
		case 'playlist':
		case 'p_link':
		case 'sale':
		case 'profilePic':
			return true
	}
	return false
}
function getCreator (hash) {
	return get(hash, { GetMask: HC.GetMask.Sources })[0];
}
function genesis () {
	return true;
}
function validateCommit (entryType, entry, header, pkg, sources) {
	return isValidEntryType(entryType);
}
function validatePut (entryType, entry, header, pkg, sources) {
	return validateCommit(entryType, entry, header, pkg, sources);
}
function validateMod (entryType, entry, header, replaces, pkg, sources) {
	return validateCommit(entryType, entry, header, pkg, sources)
		// Only allow the creator of the entity to modify it.
		&& getCreator(header.EntryLink) === getCreator(replaces);
}
function validateDel (entryType, hash, pkg, sources) {
	return isValidEntryType(entryType)
		// Only allow the creator of the entity to delete it.
		&& getCreator(hash) === sources[0];
}
function validatePutPkg (entryType) {
	return null;
}
function validateModPkg (entryType) {
	return null;
}
function validateDelPkg (entryType) {
	return null;
}
function validateLink(entryType, hash, links, package, sources){
	return true
}
function getMyProfileHash() {
	return query({
		Return : {
			Hashes : true
		},
		Constrain : {
			EntryTypes : ["profile"],
			Count : 1
		}
	})[0]
}
function getMyProfile() {
	return query({
		Return : {
			Hashes : true,
			Entries: true
		},
		Constrain : {
			EntryTypes : ["profile"],
			Count : 1
		}
	})[0]
}
function follow(followHash) {
	var hash = commit('link', {
		Links: [
			{
				Base: getMyProfileHash(),
				Link: followHash,
				Tag: 'follow'
			}
		]
	})
	if (!hash) {
		console.log('error on creating follow_link')
		return
	}
	hash = commit('link', {
		Links: [
			{
				Base: followHash,
				Link: getMyProfileHash(),
				Tag: 'follower'
			}
		]
	})
	if (!hash) {
		console.log('error on creating follower_link')
		return
	}
	return hash
}
function getMyChannel() {
	var me = getMyProfile()
	if ( ! me ) {
		return 'false'
	}
	me.myPlaylists = getLinks(me.Hash,'playlist',{
				Load : true
			})
	return JSON.stringify(me)
}
function saveImage(image) {
	var src = commit('profilePic',image)
	commit('link',{Links:[{
		Base:src,
		Tag:'image',
		Link:src
	}]})
	return src
}
function chunkSubstr(str, size) {
  var numChunks = Math.ceil(str.length / size)
  var chunks = new Array(numChunks)

  for (var i = 0, o = 0; i < numChunks; ++i, o += size) {
    chunks[i] = str.substr(o, size)
  }

  return chunks
}
function saveTrack(track) {
	var songHash = commit('track',track)
	var array = chunkSubstr(track,102400)//100kb
	var shortLength = Math.floor( array.length * .1 )//10%
	array.forEach(function(current,i){
		var src = commit('track',{data:current,index:i})
		var hash = commit('link',{Links:[{
			Base:songHash,
			Tag:'track',
			Link:src
		}]})
		if ( i < shortLength ) {
			var hashDemo = commit('link',{Links:[{
				Base:songHash,
				Tag:'trackDemo',
				Link:src
			}]})
		}
	})
	return songHash
}
function getTrack(hash){
	// console.log('required: ' + hash)
	var links = getLinks(hash,'track',{Load:true})
	var res = '['
	links.forEach(function (link) {
		res += '{"index":'+link.Entry.index+',"data":"'+link.Entry.data+'"},'
	})
	return res + '{"index":-1}]'
}
function getTrackDemo(hash){
	// console.log('required: ' + hash)
	var links = getLinks(hash,'trackDemo',{Load:true})
	var res = '['
	links.forEach(function (link) {
		res += '{"index":'+link.Entry.index+',"data":"'+link.Entry.data+'"},'
	})
	return res + '{"index":-1}]'
}
function saveEpisode(episode) {
	var hash = commit('episode',{
		name:episode.name,
		timestamp:(new Date()).valueOf(),
		datalink:episode.audioHash
	})
	return commit('link',{
		Links:[
			{
				Base : episode.parentHash,
				Link : hash,
				Tag  : 'episode'
			}
		]
	})
}
function getImg(hash){
	return getLinks(hash,'',{Load:true})[0].Entry
}
function createProfile(data) {
	data.address = App.Key.Hash
	var profileHash = commit('profile',data)
	var linkHash = commit('link',{
		Links:[{
			Base : APP_ID,
			Tag : 'profile',
			Link : profileHash
		}]
	})
	return linkHash
}
function getChannels(){
	return getLinks(APP_ID,'profile', { Load: true })
}
function getDashboard(argument) {
	return "\_(>'-'<)_/"
}
function newPlaylist(data){
	var myHash = getMyProfileHash()
	data.owner = myHash
	data.tag = []
	data.created = (new Date()).valueOf()
	var playlistHash = commit('playlist',data)
	return commit('link',{
		Links:[
			{
				Link:playlistHash,
				Tag:'playlist',
				Base:myHash
			}
		]
	})
}
function getFollowing() {
	return JSON.stringify(getLinks( getMyProfileHash() , 'follow' , { Load : true } ))
}
function getFollowers() {
	return JSON.stringify(getLinks( getMyProfileHash() , 'follower' , { Load : true } ))
}
function viewPlaylist(hash) {
	var r = get( hash )
	if (r === HC.HashNotFound) {
		console.log('Entry not found')
		return '{}'
	} else {
		return JSON.stringify(r)
	}
}
function getEpisodes(hash){
	return JSON.stringify(getLinks(hash,'episode',{Load:true}))
}
function getPlaylists(hash){
	return JSON.stringify(getLinks(hash,'playlist',{Load:true}))
}
function getJSONData(hash){
	return JSON.stringify(get(hash))
}
function getComments(hash) {
	return JSON.stringify(getLinks(hash,'comment',{Load:true}))
}
function comment(data) {
	var myProfile = getMyProfile()
	var hash = commit('comment',{
        "fromAddress" : myProfile.Hash,
        "timestamp"   : (new Date()).valueOf(),
		"from"        : myProfile.Entry.username,
        "text"        : data.text,
        "rank"        : data.rank
	})
	return commit('link',{
		Links:[{
			Tag:'comment',
			Base:data.base,
			Link:hash
		}]
	})
}
function action(params) {
	var hash = commit('action',{
		timestamp : ( new Date() ).valueOf(),
		moment    : Number( params.moment ),
		type      : params.type
	})
	console.log('ph : ' + params.petitionHash)
	var linkHash = commit('link',{
		Links:[
			{
				Link : hash,
				Base : params.petitionHash,
				Tag  : 'action'
			}
		]
	})
	return linkHash
}
function petition( episodeHash ) {
	var hash = commit('petition',{
		user : getMyProfileHash(),
		timestamp : (new Date()).valueOf()
	})
	var linkHash = commit('link',{
		Links:[
			{
				Link : hash,
				Base : episodeHash,
				Tag  : 'petition'
			}
		]
	})
	//Now we have to push one more link in order to access the petitions
	//from the user's point of view. Like some sort of "history"
	var episode = get( episodeHash )
	debug( episode )
	var historyHash = commit( 'history_entry' , {
		episode : episode,
		timestamp : (new Date()).valueOf()
	})
	console.log(historyHash)
	var historyEntryLink = commit( 'p_link' , {
		Links:[{
			Link : historyHash,
			Base : ME,
			Tag  : 'history_entry'
		}]
	})
	console.log(historyEntryLink)
	return hash
}
function getMyHistory() {
	var links = getLinks( ME , 'history_entry' , { Load : true } )
	return JSON.stringify(links)
}
function getActionStats(hash) {
	return getLinks(hash,'action',{Load:true})
}
// the next 3 functions are similar in structure and behavior. I've considered
// using the recursive approach, but it would be really hard to mantain and
// even harder to debug.
function getPetitionStats(hash) {//private function
	var pts = getLinks(hash,'petition',{Load:true})
	pts.forEach(function (pt,i) {
		pts[i].actions = getActionStats(pt.Hash)
	})
	return pts
}
function getSongsStats(hash){//private function
	var sgs = getLinks(hash,'episode',{Load:true})
	sgs.forEach(function (sg,i) {
		sgs[i].petitions = getPetitionStats(sg.Hash)
	})
	return sgs
} 
function getAlbumsStats(hash){//private function
	var pls = getLinks(hash,'playlist',{Load:true})
	pls.forEach(function (pl,i) {
		pls[i].songs = getSongsStats(pl.Hash)
	})
	return pls
}
function pullTrackingData(){//public function
	return JSON.stringify( getAlbumsStats( getMyProfileHash( ) ) )
}
/*Next functions are for song buying functionality*/
/* 
 * Variables:
 * 
 * S  : the sale under the 'sale' data structure
 * L1 : link from the user to the sale, tagged: 'bought'
 * L2 : link from the song to the sale, tagged: 'sold'
 * L3 : optional link from the guest to the sale, tagged: 'received'
 * 
 * Steps to buy a song for the user:
 * 
 * 1 - Do the transaction
 * 2 - commit the sale S
 * 3 - make links L1 and L2
 * 
 * Steps to buy a song for someone else:
 * 
 * 1 - Do the transaction
 * 2 - commit the sale under the 'sale' data structure
 * 3 - create the links L2 and L3
 * 
 * Steps to check if an user has a song:
 * 
 * 1 - use his profile's hash as base to get the links tagged 'bought'
 * 2 - filter them until the transaction is the one from the song
 * 3 - if the array is not empty go to step six
 * 4 - use his profile's hash as base to get the links tagged 'received'
 * 5 - filter them until the transaction is the one from the song
 * 6 - return array.length === 0 ? 'false' : 'true'
*/

/* function buySong
 * Expected parameters:
	 * data (Object)
	 * data.owner (string) // owner of the song
	 * data.song (string)  //song's hash
	 * data.guest (string) (optional) //recipient of the gift
 * Returns hash or error
*/
function buySong(data) {
	var owner = get(data.owner),
		songHash = data.song
	debug('owner:')
	debug(owner)
	var T0Hash = call( 'bacon' , 'transact' , {//make the transaction via bridge
		to      : owner.address,
		concept : songHash,
		amount  : 1
	}).split('"').join('')
	if ( ! T0Hash ) {
		return 'error in transaction'
	}
	console.log('transaction hash :',T0Hash)
	var saleData = {
		transaction : T0Hash,
		song        : songHash,
		user        : owner.address
	}
	if ( data.guest ) {//the song is a gift
		saleData.giftRecipient = data.guest
	}
	try{
		var saleHash = commit( 'sale' , saleData )
	}catch(err){
		console.log('sale validation failed: ',err)
		console.log('saleData: ',JSON.stringify(saleData,null,2))
		return
	}
	var linksToCommit = [{//L2
		Link : saleHash,
		Base : data.owner,
		Tag  : 'sold'
	}]
	if ( data.guest ) {//song as a gift
		linksToCommit.push({//L3
			Link : saleHash,
			Base : data.guest,
			Tag  : 'received'
		})
	}else{//song for me
		linksToCommit.push({//L1
			Link : saleHash,
			Base : getMyProfileHash(),
			Tag  : 'bought'
		})
	}
	return commit('link',{Links:linksToCommit})
}
function songOwned(songHash) {
	var bought = getLinks(getMyProfileHash(),'bought',{Load:true})
	var transaction = bought.filter(function(currentTransaction) {
		return currentTransaction.Entry.song === songHash
	})[0]
	if (!transaction) {
		var received = getLinks(getMyProfileHash(),'received',{Load:true})
		transaction = received.filter(function(currentTransaction) {
			return currenTransaction.Entry.song === songHash
		})[0]
	}
	return transaction ? 'true' : 'false'
}