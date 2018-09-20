import React, { Component } from 'react'

class Image extends Component {
	constructor(props){
		super( props )
		this.handleError = this.handleError.bind(this)
		this.state = { src : 'default.png' }
		if ( this.props.src ) {
			fetch('/fn/holoc/getImg',{
				method : 'POST',
				body : this.props.src
			})
			.then((response)=> {
				if(response.ok) {
					return response.text()
				}
				throw new Error('Network error.')
			})
			.then((text)=> {
				// var objectURL = URL.createObjectURL(myBlob) 
				this.setState({ src: text })
			})
			.catch((error)=> {
				console.log('There has been a problem with your fetch operation: ', error.message)
			})
		}
	}
	handleError(e){
		console.log( 'error loading img' )
		e.target.src = this.props.default || 'default.png'
	}
	render() {
			return (
				<img
					alt={ this.props.alt }
					src={ this.props.base64Src || this.state.src || this.props.default }
					onError={ this.handleError }/>
			)
	}
}

export default Image;
