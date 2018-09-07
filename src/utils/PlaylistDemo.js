import React, { Component } from 'react'

class PlaylistDemo extends Component {
	display(e){
		e.preventDefault()
	}
	render() {
		/*
		 * The use of the tabIndex attribute makes the element focusable.
		 * we use this as a way to modify the 
		*/
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
