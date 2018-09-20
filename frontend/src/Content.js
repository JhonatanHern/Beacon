import React, { Component } from 'react'

import Dashboard from './content/Dashboard.js'
import MyChannel from './content/MyChannel.js'
import Following from './content/Following.js'
import Followers from './content/Followers.js'
import Channels  from './content/Channels.js'

class Content extends Component {
	componentWillReceiveProps(op,np){
	}
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
						me={this.props.me}
						data={this.props.data}
						/>
				break
			case 'following':
				data = <Following
						me={this.props.me}
						data={this.props.data}
						/>
				break
			case 'followers':
				data = <Followers
						following={this.props.following}
						me={this.props.me}
						data={this.props.data}
						follow={this.props.follow}
						/>
				break
			case 'channels':
				data = <Channels
						following={this.props.following}
						me={this.props.me}
						data={this.props.data}
						follow={this.props.follow}
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
