import React, { Component } from 'react'

import './App.css'
import Nav from './Nav.js'
import Content from './Content.js'
import Triangles from './Triangles.js'
import Ajax from './Ajax.js'
import Audio from './utils/Audio.js'
import CreateProfileModal from './utils/CreateProfileModal.js'

class App extends Component {
	constructor(props){
		super(props)
		this.state = {
			current : '',
			me:null,
			opacity:'1',
			displayCreateProfileModal:false,
			audioSrc:'$UICIDEBOY$ - I NO LONGER FEAR THE RAZOR GUARDING MY HEEL.mp3'
		}

		this.closeModal    = this.closeModal.bind( this )
		this.setCurrent    = this.setCurrent.bind( this )
		this.initProfile   = this.initProfile.bind( this )
		this.createChannel = this.createChannel.bind( this )
		this.submitProfile = this.submitProfile.bind( this )

		this.initProfile()
	}
	/*
	 * function submitProfile
	 * @param data is an object
	 *     data.username
	 *     data.name
	 *     data.mail
	 *     data.address
	 *     data.profile_pic
	 *     data.description
	 *     data.file // file object
	*/
	submitProfile(data){
		this.setState({displayCreateProfileModal:false})
		Ajax.createProfile(data)
	}
	closeModal(e){
		if ( e.target.id === 'create-profile-modal' ) {
			this.setState({displayCreateProfileModal:false})
		}
	}
	createChannel(){
		this.setState({displayCreateProfileModal:true})
	}
	async initProfile(){
		this.setState({ me : await Ajax.getMyChannel() })
	}
	async setCurrent(e){
		let dataTarget = e.target.getAttribute('data-target')
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
	render() {
		return (
			<div>
				<Nav user={this.state.me} opacity={this.state.opacity} setCurrent={this.setCurrent}/>
				<Triangles />
				<Content opacity={this.state.opacity} me={this.state.me} current={this.state.current} data={this.state.data}/>
				<Audio src={this.state.audioSrc}/>
				{this.state.displayCreateProfileModal && <CreateProfileModal close={this.closeModal} done={this.submitProfile}/>}
			</div>
		)
	}
}

export default App
