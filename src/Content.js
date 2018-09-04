import React, { Component } from 'react'

import Dashboard from './content/Dashboard.js'
import MyChannel from './content/MyChannel.js'
import Following from './content/Following.js'
import Channels from './content/Channels.js'

class Content extends Component {
	componentWillReceiveProps(op,np){
	}
	render() {
		let data = null
		switch(this.props.current){
			case 'dashboard':
				data = <Dashboard data={this.props.data}/>
				break
			case 'myChannel':
				data = <MyChannel data={this.props.data}/>
				break
			case 'following':
				data = <Following data={this.props.data}/>
				break
			case 'channels':
				data = <Channels data={this.props.data}/>
				break
			default:
		}
    	return (
    		<main>
    			{data}
    		</main>
	    )
	}
}


export default Content
