import React, { Component } from 'react'

import Channel from '../utils/Channel.js'

class MyChannels extends Component {
	constructor(props){
		super( props )
		this.state = {}
	}
	render() {
    	return (
    		<Channel
    			data={this.props.me.Entry}
    			playLists={this.props.me.myPlaylists}
    			/>
	    )
	}
}

export default MyChannels
