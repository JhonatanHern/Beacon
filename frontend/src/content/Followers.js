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
		let i = 0,//counter
			followingHashes = this.props.following.map(f=>f.Hash)
    	return (
    		<div>
    			<h2>Channels</h2>
    			{
    				this.props.data.filter(d=>followingHashes.includes(d.Hash)).filter(d=>d.Hash!==this.props.me.Hash).map((d)=>
    					<MiniProfile data={d} key={i++} />
    				)
    			}
    			{
    				this.props.data.filter(d=>!followingHashes.includes(d.Hash)).filter(d=>d.Hash!==this.props.me.Hash).map((d)=>
    					<MiniProfile data={d} key={i++} follow={this.follow} />
    				)
    			}
    		</div>
	    )
	}
}

export default Followers
