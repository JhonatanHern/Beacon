/*
	App constants
*/
var APP_ID = App.DNA.Hash,
	ME = App.Key.Hash


/*******************************************************************************
 * Utility functions
 ******************************************************************************/


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
	console.log(array.length)
	array.forEach(function(current,i){
		var src = commit('track',{data:current,index:i})
		var hash = commit('link',{Links:[{
			Base:songHash,
			Tag:'track',
			Link:src
		}]})
		console.log((100*(i/array.length))+'%')
	})
	console.log('result: ' + songHash)
	return songHash
}
function getTrack(hash){
	// console.log('required: ' + hash)
	var links = getLinks(hash,'track',{Load:true})
	console.log(links.length + ' blocks loaded')
	var res = '['
	links.forEach(function (link) {
		res += '{"index":'+link.Entry.index+',"data":"'+link.Entry.data+'"},'
	})
	console.log('response prepared, response length: '+(res.length+13))
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
		tymestamp : ( new Date() ).valueOf(),
		moment    : Number( params.moment ),
		type      : params.type
	})
	var linkHash = commit('link',{
		Links:[
			{
				Link : hash,
				Base : param.petitionHash,
				tag  : 'action'
			}
		]
	})
}
function petition(episodeHash) {
	var hash = commit('petition',{
		user : getMyProfileHash(),
		timestamp : (new Date()).valueOf()
	})
	console.log('petition created')
	console.log(hash)
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
	commit('p_link',{
		Links:[{
			Link : linkHash,
			Base : ME,
			Tag  : 'history'
		}]
	})
	return hash
}
function getMyHistory() {
	return getLinks(ME,'history',{Load:true})
}