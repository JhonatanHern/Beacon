import React, { Component } from 'react'

class MiniProfile extends Component {
	display(e){
		e.preventDefault()
	}
	render() {
		return (
			<a>
				this.props.data.name (@{this.props.data.username})
			</a>
		)
	}
}

export default MiniProfile;
