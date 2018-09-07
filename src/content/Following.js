import React, { Component } from 'react'
import MiniProfile from '../utils/MiniProfile.js'

class Following extends Component {
	constructor(props){
		super( props )
		this.state = {}
	}
	render() {
    	return (
    		<div>
    			<h2>Channels</h2>
    			{
    				this.props.data.map((d,i)=>
    					<MiniProfile data={d} key={i}/>
    				)
    			}
    		</div>
	    )
	}
}

export default Following
