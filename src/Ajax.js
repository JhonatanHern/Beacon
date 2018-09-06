//import React , { Component } from 'react'

class Ajax {
	static loading(){
		document.getElementById('loading').style.display = 'block'
	}
	static loaded(){
		document.getElementById('loading').style.display = 'none'
	}
	static fetchWrapper( url , data , responseType = 'text' ){
		this.loading()
		return new Promise( ( succ , erro ) => {//test ajax simulator
			setTimeout(()=>{
				switch(url){
					case 'getDashboard':
						succ([])
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
						succ([])
						break
					default:
				}
				this.loaded()
			},700)
		})
		/* real ajax
		return new Promise( ( succ , erro ) => {
			fetch('/fn/podcast/'+url,{
				method : 'POST',
				body : data
			})
			.then(r=>r[responseType]())
			.then(response=>{
				succ(response)
				this.loaded()
			})
			.catch(err=>{
				erro(err)
				this.loaded()
			})
		})
		*/
	}
	static getDashboard(data){
		return this.fetchWrapper('getDashboard',data,'json')
	}
	static getMyChannel(data){
		return this.fetchWrapper('getMyChannel',data,'json')
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
}

export default Ajax