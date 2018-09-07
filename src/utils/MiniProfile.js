import React, { Component } from 'react'

class MiniProfile extends Component {
	display(e){
		e.preventDefault()
	}
	render() {
		return (
			<a className="mini-profile">
				<div>
					<span>
						{this.props.data.name}
					</span> 
					<small>
						 (@{this.props.data.username})
					</small>
				</div>
				{this.props.follow && <button onClick={this.props.follow}>follow</button>}
			</a>
		)
	}
}

export default MiniProfile;
