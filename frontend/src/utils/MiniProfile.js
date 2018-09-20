import React, { Component } from 'react'

class MiniProfile extends Component {
	constructor(props){
		super(props)
		this.followProfile = this.followProfile.bind(this)
	}
	followProfile(){
		this.props.follow(this.props.data.Hash)
	}
	render() {
		return (
			<a className="mini-profile">
				<div>
					<span>
						{this.props.data.Entry.name}
					</span> 
					<small>
						 (@{this.props.data.Entry.username})
					</small>
				</div>
				{this.props.follow && <button onClick={this.followProfile}>follow</button>}
			</a>
		)
	}
}

export default MiniProfile;
