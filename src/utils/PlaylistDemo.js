import React, { Component } from 'react'

class PlaylistDemo extends Component {
	display(e){
		e.preventDefault()
	}
	render() {
    	return (
    		<div tabIndex="666" className="playlist-demo">
    			<a>{this.props.data.Entry.name}</a>
    			<p>
    				{this.props.data.Entry.concept}
    			</p>
    			<button>Listen</button>
    		</div>
	    )
	}
}

export default PlaylistDemo;
