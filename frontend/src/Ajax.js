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
	static readImageBin(file){
		return new Promise((succ,err)=>{
			let reader = new FileReader()
			reader.onload = ()=>{
				let binData = reader.result
				succ(binData)
			}
			reader.onerror = ()=>{
				err('Reading error')
			}
			reader.readAsDataURL(file)
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
}

export default Ajax


















		/*
		return new Promise( ( succ , erro ) => {//test ajax simulator
			setTimeout(()=>{
				switch(url){
					case 'getDashboard':
						succ([
							{
								username:'deadmatch',
								address:'fwecru7w47rcbr7twrcfowmrcy4srsw',
								name:'Alexander Karius',
								mail:'aaa@aaa.net',
								profile_pic:'cfnsvru4489fnm34jf894jf9834judfj',
								description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
								playlists : [
									{
										Entry:{
											name : 'examplay',
											tags : ['a','b','c'],
											concept : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,',
											owner : 'cdzawrfscefgnefui',
											created : 34862549
										},
										Hash:'fieywgfyigen89f4g8fgd84gdf7'
									},
									{
										Entry:{
											name : 'examplay2',
											tags : ['a','b','c'],
											concept : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,',
											owner : 'cdzawrfscefgnefui',
											created : 34862349
										},
										Hash:'fieywgfyigen89f4g8fgd84gdf7'
									},
									{
										Entry:{
											name : 'examplay3',
											tags : ['a','b','c'],
											concept : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,',
											owner : 'cdzawrfscefgnefui',
											created : 3462549
										},
										Hash:'fieywgfyigen89f4g8fgd84gdf7'
									},
									{
										Entry:{
											name : 'examplay4',
											tags : ['a','b','c'],
											concept : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,',
											owner : 'cdzawrfscefgnefui',
											created : 34852549
										},
										Hash:'fieywgfyigen89f4g8fgd84gdf7'
									}
								]
							},
							{
								username:'malditoMaduro',
								address:'fwecru7w47rcbr7twrcfowmrcy4srsw',
								name:'Kris Kras',
								mail:'aaa@aaa.net',
								profile_pic:'cfnsvru4489fnm34jf894jf9834judfj',
								description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
								playlists : [
									{
										Entry:{
											name : 'xexamplay',
											tags : ['a','b','c'],
											concept : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,',
											owner : 'cdzawrfscefgnefui',
											created : 34862549
										},
										Hash:'fieywgfyigen89f4g8fgd84gdf7'
									},
									{
										Entry:{
											name : 'xexamplay2',
											tags : ['a','b','c'],
											concept : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,',
											owner : 'cdzawrfscefgnefui',
											created : 34862349
										},
										Hash:'fieywgfyigen89f4g8fgd84gdf7'
									},
									{
										Entry:{
											name : 'xexamplay3',
											tags : ['a','b','c'],
											concept : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,',
											owner : 'cdzawrfscefgnefui',
											created : 3462549
										},
										Hash:'fieywgfyigen89f4g8fgd84gdf7'
									},
									{
										Entry:{
											name : 'examplay4',
											tags : ['a','b','c'],
											concept : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,',
											owner : 'cdzawrfscefgnefui',
											created : 34852549
										},
										Hash:'fieywgfyigen89f4g8fgd84gdf7'
									}
								]
							},
							{
								username:'killer',
								address:'fwecru7w47rcbr7twrcfowmrcy4srsw',
								name:'Amons Amad',
								mail:'aaa@aaa.net',
								profile_pic:'cfnsvru4489fnm34jf894jf9834judfj',
								description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
								playlists : [
									{
										Entry:{
											name : 'jexamplay',
											tags : ['a','b','c'],
											concept : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,',
											owner : 'cdzawrfscefgnefui',
											created : 34862549
										},
										Hash:'fieywgfyigen89f4g8fgd84gdf7'
									},
									{
										Entry:{
											name : 'jexamplay2',
											tags : ['a','b','c'],
											concept : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,',
											owner : 'cdzawrfscefgnefui',
											created : 34862349
										},
										Hash:'fieywgfyigen89f4g8fgd84gdf7'
									},
									{
										Entry:{
											name : 'kexamplay3',
											tags : ['a','b','c'],
											concept : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,',
											owner : 'cdzawrfscefgnefui',
											created : 3462549
										},
										Hash:'fieywgfyigen89f4g8fgd84gdf7'
									},
									{
										Entry:{
											name : 'huioexamplay4',
											tags : ['a','b','c'],
											concept : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,',
											owner : 'cdzawrfscefgnefui',
											created : 34852549
										},
										Hash:'fieywgfyigen89f4g8fgd84gdf7'
									}
								]
							},
						])
						break
					case 'getMyChannel':
						succ({
							me:{
								username:'AAAAAAAAAAAAAAAAAAA',
								address:'fwecru7w47rcbr7twrcfowmrcy4srsw',
								name:'Alexander Karius',
								mail:'aaa@aaa.net',
								profile_pic:'cfnsvru4489fnm34jf894jf9834judfj',
								description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
							},
							myPlaylists:[
								{
									Hash:'cdehkcnsdjbcasdcidncijandcisdgzsfgsdrftfer4',
									Entry:{
										name:'keketorrr',
										tags:['a','b','c','d',"e"],
										concept:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
									}
								},
								{
									Hash:'cvsdfgdfgsdfgsasdcidncijandcisdgzsfgsdrftfer4',
									Entry:{
										name:'keketorrr 2',
										tags:['a','b','c','d',"e"],
										concept:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
									}
								},
								{
									Hash:'cdehkszdfgsdgsdgcidncijandcisdgzsfgsdrftfer4',
									Entry:{
										name:'keketorrr 3',
										tags:['a','b','c','d',"e"],
										concept:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
									}
								}
							]
						})
						break
					case 'getFollowing':
						succ([
							{
								username:'AAAAAAAAAAAAAAAAAAA',
								address:'fwecru7w47rcbr7twrcfowmrcy4srsw',
								name:'Alexander Karius',
								mail:'aaa@aaa.net',
								profile_pic:'data:image/cdcdigabtr/tr764ebr8w7r8w0'
							},
							{
								username:'AAAAAAAAAAAAAAAAAAA',
								address:'fwecru7w47rcbr7twrcfowmrcy4srsw',
								name:'Alexander Karius',
								mail:'aaa@aaa.net',
								profile_pic:'data:image/cdcdigabtr/tr764ebr8w7r8w0'
							},
							{
								username:'AAAAAAAAAAAAAAAAAAA',
								address:'fwecru7w47rcbr7twrcfowmrcy4srsw',
								name:'Alexander Karius',
								mail:'aaa@aaa.net',
								profile_pic:'data:image/cdcdigabtr/tr764ebr8w7r8w0'
							}
						])
						break
					case 'getFollowers':
						succ([
							{
								username:'AAAAAAAAAAAAAAAAAAA',
								address:'fwecru7w47rcbr7twrcfowmrcy4srsw',
								name:'Alexander Karius',
								mail:'aaa@aaa.net',
								profile_pic:'data:image/cdcdigabtr/tr764ebr8w7r8w0'
							},
							{
								username:'AAAAAAAAAAAAAAAAAAA',
								address:'fwecru7w47rcbr7twrcfowmrcy4srsw',
								name:'Alexander Karius',
								mail:'aaa@aaa.net',
								profile_pic:'data:image/cdcdigabtr/tr764ebr8w7r8w0'
							},
							{
								username:'AAAAAAAAAAAAAAAAAAA',
								address:'fwecru7w47rcbr7twrcfowmrcy4srsw',
								name:'Alexander Karius',
								mail:'aaa@aaa.net',
								profile_pic:'data:image/cdcdigabtr/tr764ebr8w7r8w0'
							},
							{
								username:'AAAAAAAAAAAAAAAAAAA',
								address:'fwecru7w47rcbr7twrcfowmrcy4srsw',
								name:'Alexander Karius',
								mail:'aaa@aaa.net',
								profile_pic:'data:image/cdcdigabtr/tr764ebr8w7r8w0'
							},
							{
								username:'AAAAAAAAAAAAAAAAAAA',
								address:'fwecru7w47rcbr7twrcfowmrcy4srsw',
								name:'Alexander Karius',
								mail:'aaa@aaa.net',
								profile_pic:'data:image/cdcdigabtr/tr764ebr8w7r8w0'
							}
						])
						break
					case 'getChannels':
						succ([
							{
								username:'AAAAAAAAAAAAAAAAAAA',
								address:'fwecru7w47rcbr7twrcfowmrcy4srsw',
								name:'Alexander Karius',
								mail:'aaa@aaa.net',
								profile_pic:'data:image/cdcdigabtr/tr764ebr8w7r8w0'
							},
							{
								username:'AAAAAAAAAAAAAAAAAAA',
								address:'fwecru7w47rcbr7twrcfowmrcy4srsw',
								name:'Alexander Karius',
								mail:'aaa@aaa.net',
								profile_pic:'data:image/cdcdigabtr/tr764ebr8w7r8w0'
							},
							{
								username:'AAAAAAAAAAAAAAAAAAA',
								address:'fwecru7w47rcbr7twrcfowmrcy4srsw',
								name:'Alexander Karius',
								mail:'aaa@aaa.net',
								profile_pic:'data:image/cdcdigabtr/tr764ebr8w7r8w0'
							},
							{
								username:'AAAAAAAAAAAAAAAAAAA',
								address:'fwecru7w47rcbr7twrcfowmrcy4srsw',
								name:'Alexander Karius',
								mail:'aaa@aaa.net',
								profile_pic:'data:image/cdcdigabtr/tr764ebr8w7r8w0'
							},
							{
								username:'AAAAAAAAAAAAAAAAAAA',
								address:'fwecru7w47rcbr7twrcfowmrcy4srsw',
								name:'Alexander Karius',
								mail:'aaa@aaa.net',
								profile_pic:'data:image/cdcdigabtr/tr764ebr8w7r8w0'
							}
						])
						break
					default:
				}
				this.loaded()
			},700)
		})
		*/