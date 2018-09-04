import React, { Component } from 'react'

class Image extends Component {
	constructor(props){
		super( props )
		this.handleError = this.handleError.bind(this)
	}
	handleError(e){
		e.target.src = this.props.default || 'default.png'
	}
	render() {
    	return (
    		<img
    			alt={ this.props.alt }
    			src={ this.props.src || this.props.default || 'default.png' }
    			onError={ this.handleError }/>
	    )
	}
}

export default Image;
