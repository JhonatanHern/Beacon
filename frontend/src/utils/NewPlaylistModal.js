import React, { Component } from 'react'
import FormModal from './FormModal.js'

class NewPlaylistModal extends Component{
	constructor(props){
		super(props)
		this.state = {}
		this.send = this.send.bind(this)
		this.name = React.createRef()
		this.concept = React.createRef()
	}
	send(){
		if (!this.name.current.value || !this.concept.current.value) {
			alert('Name and concept required')
			return
		}
		this.props.create({
			name : this.name.current.value,
			concept : this.concept.current.value
		})
	}
	render(){
		return (
			<FormModal>
				<input placeholder='Title' ref={this.name} style={{marginTop:'3em'}}/>
				<input placeholder='Concept' ref={this.concept}/>
				<button className='default-button' onClick={this.send}>Create Playlist</button>
			</FormModal>
		)
	}
}

export default NewPlaylistModal