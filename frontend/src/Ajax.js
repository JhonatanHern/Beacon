class Ajax {
	static loading(){// activates preloader
		document.getElementById('loading').style.display = 'block'
	}
	static loaded(){// deactivates preloader
		document.getElementById('loading').style.display = 'none'
	}
	static fetchWrapper( url , data = '' , responseType = 'text' ){
		this.loading()
		return new Promise( ( succ , erro ) => {
			fetch('/fn/holoc/'+url,{
				method : 'POST',
				body : data
			})
			.then(response=>{
				return response[responseType]()
				//return response.json()
			})
			.then(response=>{
				console.log('%c '+url, 'background: #222; color: #bada55')
				console.log(typeof response)
				console.log(responseType)
				console.log(response)
				/*
				 * Little detail, when we execute response.json
				 * is not equal to JSON.parse, and returns
				 * boolean values as strings. The next 5 lines
				 * take care of that situation:
				*/
				if (response==='true'||response==='false'||(responseType==='json'&&typeof response==='string')) {
					succ(JSON.parse(response))
				}else{
					succ(response)
				}
				this.loaded()//deactivates preloader
			})
			.catch(err=>{
				erro(err)
				this.loaded()//deactivates preloader
			})
		})
	}
	static getDashboard(data){
		return this.fetchWrapper('getDashboard',data,'json')
	}
	static getMyChannel(){
		return this.fetchWrapper('getMyChannel','','json')
	}
	static getFollowing(data){
		return this.fetchWrapper('getFollowing',data,'json')
	}
	static getFollowers(data){
		return this.fetchWrapper('getFollowers',data,'json')
	}
	static getChannels(data){
		return this.fetchWrapper('getChannels',data,'json')
	}
	static getSettings(){
		return new Promise((succ,e)=>succ())
	}
	static readImageBin(file){
		return new Promise((succ,err)=>{
			let reader = new FileReader()
			reader.onload = () => {
				let binData = reader.result
				succ( binData )
			}
			reader.onerror = () => {
				err( 'Reading error' )
			}
			reader.readAsDataURL( file )
		})
	}
	static async createProfile({file,username,name,mail,address,description}){
		let imageHash = false
		if (file) {
			imageHash = await this.fetchWrapper('saveImage',await this.readImageBin(file))
		}
		if (imageHash) {
			console.log(imageHash)
		} else {
			console.log('image not uploaded')
		}
		let profileData = {
			profile_pic : imageHash,
			description : description,
			username : username,
			address : address,
			name : name,
			mail : mail,
		}
		let profileHash = await this.fetchWrapper( 'createProfile' , JSON.stringify( profileData ) )
		console.log(profileHash)
	}
	static follow(hash){
		return this.fetchWrapper('follow',hash)
	}
	static newPlaylist(data){
		return this.fetchWrapper('newPlaylist',JSON.stringify(data))
	}
	static viewPlaylist(hash){
		return this.fetchWrapper('viewPlaylist',hash)
	}
	static getEpisodes(hash){
		return this.fetchWrapper('getEpisodes',hash,'json')
	}
	static async uploadTrack({hash,name,file}){
		const audioHash = await this.fetchWrapper('saveTrack',file,'text')
		if (!audioHash) {
			alert('Error in the file upload') 
		}
		return this.fetchWrapper('saveEpisode',JSON.stringify({
			parentHash:hash,
			name:name,
			audioHash:audioHash
		}),'text')
	}
	static getJSONData(hash){
		return this.fetchWrapper('getJSONData',hash,'json')
	}
	static getData(hash){
		return this.fetchWrapper('getImg',hash)
	}
	static getPlaylists(profileHash){
		return this.fetchWrapper('getPlaylists',profileHash,'json')
	}
	static getHistory(){
		return this.fetchWrapper('getMyHistory','','json')
	}
}

export default Ajax