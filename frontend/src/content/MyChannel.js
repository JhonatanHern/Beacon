import React, { Component } from 'react'

import Image from '../utils/Image.js'
import PlaylistDemo from '../utils/PlaylistDemo.js'

class MyChannels extends Component {
	constructor(props){
		super( props )
		this.state = {}
	}
	render() {
		return (
			<div className="channel">
				<div>
					<Image src={ this.props.me.Entry.profile_pic } />
					<h1 className="v-little">{this.props.me.Entry.name}</h1>
					<br className="v-big"/>
					<br className="v-big"/>
					<span>@{this.props.me.Entry.username}</span>
					<br/>
					<br/>
					<span>{this.props.me.Entry.mail}</span>
				</div>
				<div>
					<h1 className="v-big">{this.props.me.Entry.name}</h1>
					<p>{this.props.me.Entry.description}</p>
				</div>
				<div>
					{
						(this.props.me.myPlaylists && this.props.me.myPlaylists.length) ?
							<React.Fragment>
								<h4>Albums:</h4>
								<button className='generic-button' onClick={e=>this.props.displayNewPlaylistModal(true)}>
									New Album!
								</button>
								{this.props.me.myPlaylists.map((p,i)=>(<PlaylistDemo key={i} data={p} viewPlaylist={this.props.viewPlaylist}/>))}
							</React.Fragment>
						:
							<React.Fragment> 
								<h5>You have no albums yet</h5>
								<button className='generic-button' onClick={e=>this.props.displayNewPlaylistModal(true)}>
									Create your first album!
								</button>
							</React.Fragment>
					}
				</div>
			</div>
		)
	}
}

export default MyChannels