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
    			<h2>Following:</h2>
    			{
    				this.props.data.map((d,i)=>
    					<MiniProfile viewProfile={this.props.viewProfile} data={d} key={i}/>
    				)
    			}
    		</div>
	    )
	}
}

export default Following
