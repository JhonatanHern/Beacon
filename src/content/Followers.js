import React, { Component } from 'react'
import MiniProfile from '../utils/MiniProfile.js'

class Followers extends Component {
	constructor(props){
		super( props )
		this.state = {}
	}
	follow(e){
		e.preventDefault()
	}
	render() {
    	return (
    		<div>
    			<h2>Channels</h2>
    			{
    				this.props.data.map((d,i)=>
    					<MiniProfile data={d} key={i} follow={this.follow}/>
    				)
    			}
    		</div>
	    )
	}
}

export default Followers
