import React, { Component } from 'react'

import Image from '../utils/Image.js'
import PlaylistDemo from '../utils/PlaylistDemo.js'

class Channel extends Component {
	render() {
    	return (
    		<div className="channel">
    			<div>
	    			<Image src={ this.props.data.profile_pic } />
	    			<h1 className="v-little">{this.props.data.name}</h1>
	    			<br className="v-big"/>
	    			<br className="v-big"/>
	    			<span>@{this.props.data.username}</span>
	    			<br/>
	    			<br/>
	    			<span>{this.props.data.mail}</span>
	    		</div>
	    		<div>
	    			<h1 className="v-big">{this.props.data.name}</h1>
	    			<p>{this.props.data.description}</p>
	    		</div>
	    		<div>
	    			<h4>Playlists:</h4>
	    			{
	    				this.props.playLists &&
	    				this.props.playLists.map((p,i)=>(
	    					<PlaylistDemo key={i} data={p} />
	    				))
	    			}
	    		</div>
    		</div>
	    )
	}
}

export default Channel
