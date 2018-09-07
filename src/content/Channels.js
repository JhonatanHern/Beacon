import React, { Component } from 'react'
import MiniProfile from '../utils/MiniProfile.js'

class Channels extends Component {
	constructor(props){
		super(props)
		this.follow = this.follow.bind(this)
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

export default Channels
