import React from 'react'

const MiniProfile = props => (
	<a className="mini-profile">
		<div>
			<span onClick={e=>props.viewProfile(props.data.Hash)}>
				{props.data.Entry.name}
			</span> 
			<small>
				 (@{props.data.Entry.username})
			</small>
		</div>
		{
			props.follow &&
			<button onClick={e=>props.follow(props.data.Hash)}>
				follow
			</button>
		}
	</a>
)

export default MiniProfile;
