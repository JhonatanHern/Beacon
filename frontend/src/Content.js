import React, { Component } from 'react'

import Dashboard from './content/Dashboard.js'
import MyChannel from './content/MyChannel.js'
import Following from './content/Following.js'
import Followers from './content/Followers.js'
import Channels  from './content/Channels.js'
import Channel  from './utils/Channel.js'

class Content extends Component {
	render() {
		let data = null
		switch(this.props.current){
			case 'dashboard':
				data = <Dashboard
						following={this.props.following}
						me={this.props.me}
						data={this.props.me}
						/>
				break
			case 'myChannel':
				data = <MyChannel
						displayNewPlaylistModal={this.props.displayNewPlaylistModal}
						me={this.props.me}
						data={this.props.data}
						viewPlaylist={this.props.viewPlaylist}
						/>
				break
			case 'following':
				data = <Following
						me={this.props.me}
						data={this.props.data}
						viewProfile={this.props.viewProfile}
						/>
				break
			case 'followers':
				data = <Followers
						following={this.props.following}
						me={this.props.me}
						data={this.props.data}
						follow={this.props.follow}
						viewProfile={this.props.viewProfile}
						/>
				break
			case 'channels':
				data = <Channels
						following={this.props.following}
						me={this.props.me}
						data={this.props.data}
						follow={this.props.follow}
						viewProfile={this.props.viewProfile}
						/>
				break
			case 'profile':
				data = <Channel
						me={this.props.me}
						data={this.props.data}
						follow={this.props.follow}
						viewProfile={this.props.viewProfile}
						viewPlaylist={this.props.viewPlaylist}
						/>
				break
			default:
		}
    	return (
    		<main style={{opacity:this.props.opacity}}>
    			{data}
    		</main>
	    )
	}
}


export default Content
