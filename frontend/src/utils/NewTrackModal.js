import React, { Component } from 'react'

class NewTrackModal extends Component{
	constructor(props){
		super(props)
		this.uploadZoneClick = this.uploadZoneClick.bind(this)
		this.handleFormSend = this.handleFormSend.bind(this)
		this.handleFile = this.handleFile.bind(this)
		// this.submitForm = this.submitForm.bind(this)
		this.dropZone = this.dropZone.bind(this)
		this.change = this.change.bind(this)
		this.state = {
			fileData : null
		}
		this.audio       = React.createRef()
		this.hiddenFile  = React.createRef()
		this.name        = React.createRef()
	}
	handleFormSend(e){
		e.preventDefault()
		if (!this.name.current.value) {
			alert('name of the track missing')
			return
		}
		if (!this.state.fileData) {
			alert('file missing')
			return
		}
		this.props.done({
			name : this.name.current.value        ,
			file : this.state.fileData
		})
	}
	handleFile(file){
		const reader = new FileReader()
		reader.addEventListener("load", () => {
		    this.setState({
		    	fileData : reader.result,
		    	fileName : file.name
		    })
		},false);
		if (!/\.(mp3|mpeg|ogg)$/.test(file.name)) {
			alert('the file must be an audio file')
			return
		}
		if (file) {
		    reader.readAsDataURL(file)
		}
	}
	change(e){
		e.preventDefault()
		this.handleFile(e.target.files[0]) // the files that were dropped
	}
	uploadZoneClick(e){
		this.audio.current.click()
	}
	dropZone(zone){
		/*
		 * Drop events aren's supported in React.js, thus, I assign the event 
		 * directly in the HTML element using refs.
		*/
		if (!zone) {
			return
		}
		zone.addEventListener('dragenter',e=>e.preventDefault())
		zone.addEventListener('dragover',e=>e.preventDefault())
		zone.addEventListener('drop',e=>{
			e.preventDefault()
			this.handleFile(e.dataTransfer.items[0].getAsFile()) // the files that were dropped
		})
	}
	render(){
		return (
			<section className='modal high-priority' onClick={this.props.close}>
				<form className='normalize' onSubmit={e=>{e.preventDefault();e.stopPropagation()}}>
					<input className="hotfix2" placeholder="Name of the track" ref={this.name}/>
					<section ref={this.dropZone} onClick={this.uploadZoneClick} className='upload-audio'>
						{
							this.state.fileName ||
							<React.Fragment>
								<span>Click here </span> to upload track
							</React.Fragment>
						}
					</section>
					<input type="file" style={{display:'none'}} onChange={this.change} ref={this.audio}/>
					<button className='hotfix1' onClick={this.handleFormSend}>
						Add Track
					</button>
				</form>
			</section>
		)
	}
}

export default NewTrackModal