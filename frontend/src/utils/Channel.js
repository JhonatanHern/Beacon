import React, { Component } from 'react'

import Image from './Image.js'
import PlaylistDemo from './PlaylistDemo.js'

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
	    			<h4>Albums:</h4>
	    			{
	    				(this.props.data.playlists && this.props.data.playlists.length) ?
		    				this.props.data.playlists.map((p,i)=>(
		    					<PlaylistDemo key={i} data={p} viewPlaylist={this.props.viewPlaylist}/>
		    				))
		    			:
		    				<h5>No albums available</h5>
	    			}
	    		</div>
    		</div>
	    )
	}
}

export default Channel
