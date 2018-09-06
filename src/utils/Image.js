import React, { Component } from 'react'

class Image extends Component {
	constructor(props){
		super( props )
		this.handleError = this.handleError.bind(this)
		this.state = { src : 'default.png' }
		if ( this.props.src ) {
			fetch('/fn/podcast/getImg',{
				method : 'POST',
				body : this.props.src
			})
			.then(function(response) {
				if(response.ok) {
					return response.blob()
				}
				throw new Error('Network error.')
			})
			.then(function(myBlob) {
				var objectURL = URL.createObjectURL(myBlob) 
				this.setState({ src: objectURL })
			})
			.catch(function(error) {
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
					src={ this.state.src || this.props.default }
					onError={ this.handleError }/>
			)
	}
}

export default Image;
