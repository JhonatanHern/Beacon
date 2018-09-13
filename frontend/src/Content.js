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
				data = <Dashboard me={this.props.me} data={this.props.data}/>
				break
			case 'myChannel':
				data = <MyChannel me={this.props.me} data={this.props.data}/>
				break
			case 'following':
				data = <Following me={this.props.me} data={this.props.data}/>
				break
			case 'followers':
				data = <Followers me={this.props.me} data={this.props.data}/>
				break
			case 'channels':
				data = <Channels me={this.props.me} data={this.props.data}/>
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
