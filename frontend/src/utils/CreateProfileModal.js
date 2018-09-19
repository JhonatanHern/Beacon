import React, { Component } from 'react'
import Image from './Image.js'
// import resize from './resize.js'

class CreateProfileModal extends Component{
	constructor(props){
		super(props)
		this.uploadZoneClick = this.uploadZoneClick.bind(this)
		this.handleFormSend = this.handleFormSend.bind(this)
		this.handleFile = this.handleFile.bind(this)
		// this.submitForm = this.submitForm.bind(this)
		this.dropZone = this.dropZone.bind(this)
		this.change = this.change.bind(this)
		this.state = {
			pictureSrc : 'default.png',
			file : null
		}
		this.profile_pic = React.createRef()
		this.description = React.createRef()
		this.hiddenFile  = React.createRef()
		this.username    = React.createRef()
		this.dropZone    = React.createRef()
		this.address     = React.createRef()
		this.name        = React.createRef()
		this.mail        = React.createRef()
	}
	handleFormSend(e){
		e.preventDefault()
		this.props.done({
			description : this.description.current.value ,
			username    : this.username.current.value    ,
			address     : this.address.current.value     ,
			mail        : this.mail.current.value        ,
			name        : this.name.current.value        ,
			file        : this.state.file
		})
	}
	handleFile(file){
		const reader = new FileReader()
		reader.addEventListener("load", () => {
		    this.setState({pictureSrc : reader.result})
		},false);

		if (file) {
			this.setState({file:file})
		    reader.readAsDataURL(file)
		}
	}
	change(e){
		e.preventDefault()
		this.handleFile(e.target.files[0]) // the files that were dropped
	}
	uploadZoneClick(e){
		this.profile_pic.current.click()
	}
	dropZone(zone){
		/*
		 * Drop events aren's supported in React.js, thus, I assign the event 
		 * directly in the HTML element using refs.
		*/
		zone.addEventListener('dragenter',e=>e.preventDefault())
		zone.addEventListener('dragover',e=>e.preventDefault())
		zone.addEventListener('drop',e=>{
			e.preventDefault()
			this.handleFile(e.dataTransfer.items[0].getAsFile()) // the files that were dropped
		})
	}
	render(){
		return (
			<section id='create-profile-modal' onClick={this.props.close}>
				<form onSubmit={e=>{e.preventDefault();e.stopPropagation()}}>
					<section ref={this.dropZone} htmlFor='imgData' onClick={this.uploadZoneClick}>
						<Image base64Src={this.state.pictureSrc} onDrop={this.drop}/>
					</section>
					<div>
						<input placeholder="username" ref={this.username}/>
						<input placeholder="name" ref={this.name}/>
						<input placeholder="mail" ref={this.mail}/>
					</div>
					<input placeholder="address" ref={this.address}/>
					<textarea placeholder="description" ref={this.description}/>
					<input type="file" style={{display:'none'}} onChange={this.change} ref={this.profile_pic}/>
					<button onClick={this.handleFormSend}>
						Create Profile
					</button>
				</form>
			</section>
		)
	}
}

export default CreateProfileModal