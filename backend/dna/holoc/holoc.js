/*
	App constants
*/
var APP_ID = App.DNA.Hash,
	ME = App.Key.Hash
/**
 * Is this a valid entry type?
 *
 * @param {any} entryType The data to validate as an expected entryType.
 * @return {boolean} true if the passed argument is a valid entryType.
 */
function isValidEntryType (entryType) {
	// Add additonal entry types here as they are added to dna.json.
	return true || ["sampleEntry"].includes(entryType);
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