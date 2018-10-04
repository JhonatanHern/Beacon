import React from 'react'

const PlaylistDemo = (props) => (
		<div tabIndex="666" className={"playlist-demo"+((props.data.user&&props.data.user.username&&' active')||'')}>
			{
				props.data.user &&
				props.data.user.username &&
				<h4 style={{margin:'0'}}>@{props.data.user.username} posted:</h4>
			}
			<a href='/' onClick={e=>e.preventDefault()}>{props.data.Entry.name}</a>
			<p>
				{props.data.Entry.concept}
			</p>
			<button onClick={()=>{props.viewPlaylist(props.data.Entry,props.data.Hash)}}>View</button>
		</div>
	)

export default PlaylistDemo;
