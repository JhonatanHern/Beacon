import React, { Component } from 'react'

import './App.css'
import Nav from './Nav.js'
import Content from './Content.js'
import Triangles from './Triangles.js'//visual effects in the background
import Ajax from './Ajax.js'
import Audio from './utils/Audio.js'
import CreateProfileModal from './utils/CreateProfileModal.js'
import NewPlaylistModal from './utils/NewPlaylistModal.js'
import Playlist from './content/Playlist.js'

class App extends Component {
	constructor(props){
		super(props)
		this.state = {
			audioSrc:'$UICIDEBOY$ - I NO LONGER FEAR THE RAZOR GUARDING MY HEEL.mp3',
			displayCreateProfileModal : false ,
			displayNewPlaylistModal : false ,
			following : [] ,
			opacity : '1' ,
			current : '' ,
			me : null
		}

		this.follow    = this.follow.bind( this )
		this.closeModal    = this.closeModal.bind( this )
		this.setCurrent    = this.setCurrent.bind( this )
		this.initProfile   = this.initProfile.bind( this )
		this.newPlaylist   = this.newPlaylist.bind( this )
		this.viewPlaylist  = this.viewPlaylist.bind( this )
		this.closePlaylist = this.closePlaylist.bind( this )
		this.createChannel = this.createChannel.bind( this )
		this.submitProfile = this.submitProfile.bind( this )
		this.updateFollowing = this.updateFollowing.bind( this )
		this.displayNewPlaylistModal = this.displayNewPlaylistModal.bind(this)
		

		this.initProfile()
	}
	/*
	 * function submitProfile
	 * @param data is an object
	 *     data.username
	 *     data.name
	 *     data.mail
	 *     data.address
	 *     data.description
	 *     data.file // file object
	*/
	async submitProfile(data){
		this.setState({displayCreateProfileModal:false})
		await Ajax.createProfile(data)
		this.initProfile()
	}
	async follow(hash){
		await Ajax.follow(hash)
		this.updateFollowing()
	}
	closeModal(e){
		if ( e.target.id === 'create-profile-modal' ) {
			this.setState({displayCreateProfileModal:false})
		}
	}
	createChannel(){
		this.setState({displayCreateProfileModal:true})
	}
	async updateFollowing(){
		let following = await Ajax.getFollowing()
		console.log('following:')
		console.log(following)
		this.setState({following:following})
	}
	async initProfile(){
		let data =  await Ajax.getMyChannel()
		this.setState({ me : data })
		if (data) {
			this.updateFollowing()
		}
	}
	displayNewPlaylistModal(d){
		this.setState({
			displayNewPlaylistModal : d
		})
	}
	async setCurrent(e){
		let dataTarget = e.target.getAttribute('data-target')
		if (dataTarget === 'myChannel'){
			this.setState({
				current : 'myChannel'
			})
			return
		}
		if (dataTarget === 'createChannel') {
			this.createChannel()
			return
		}else{
			let functionName = 'get' +
				dataTarget[0].toUpperCase() +
				dataTarget.slice(1)
			
			this.setState({
				data : await Ajax[ functionName ](),
				current : dataTarget
			})
		}
	}
	async newPlaylist(data){
		await Ajax.newPlaylist(data)
		let profile = await Ajax.getMyChannel()
		this.setState({ me : profile })
		this.displayNewPlaylistModal(false)
	}
	async viewPlaylist(data,hash){
		let tracks = await Ajax.getTracks(hash)
		this.setState({
			currentPlaylist : data,
			currentTracklist : tracks,
			displayPlaylist : true
		})
	}
	closePlaylist(){
		this.setState({displayPlaylist:false})
	}
	render() {
		return (
			<div>
				<Nav user={this.state.me} opacity={this.state.opacity} setCurrent={this.setCurrent}/>
				<Triangles />
				<Content
					displayNewPlaylistModal={this.displayNewPlaylistModal}
					following={this.state.following}
					opacity={this.state.opacity}
					current={this.state.current}
					data={this.state.data}
					follow={this.follow}
					me={this.state.me}
					viewPlaylist={this.viewPlaylist}
					/>
				<Audio src={this.state.audioSrc}/>
				{
					this.state.displayCreateProfileModal &&
					<CreateProfileModal close={this.closeModal} done={this.submitProfile}/>
				}
				{
					this.state.displayNewPlaylistModal &&
					<NewPlaylistModal create={this.newPlaylist}/>
				}
				{
					this.state.displayPlaylist &&
					<Playlist
						data={this.state.currentPlaylist}
						tracklist={this.state.currentTracklist || []}
						close={this.closePlaylist}
						mine={this.state.currentPlaylist.owner===this.state.me.Hash}
						/>
				}
			</div>
		)
	}
}

export default App
