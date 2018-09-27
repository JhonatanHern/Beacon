import React, { Component } from 'react'
import MiniProfile from '../utils/MiniProfile.js'

class Channels extends Component {
	constructor(props){
		super(props)
		this.follow = this.follow.bind(this)
	}
	follow(hash){
		this.props.follow(hash)
	}
	render() {
		let i = 0,//counter
			followingHashes = (this.props.following || []).map(f=>f.Hash)
    	return (
    		<div>
    			<h2>Channels</h2>
    			{
    				this.props.data.filter(d=>followingHashes.includes(d.Hash)).filter(d=>d.Hash!==this.props.me.Hash).map((d)=>
    					<MiniProfile viewProfile={this.props.viewProfile} data={d} key={i++} />
    				)
    			}
    			{
    				this.props.data.filter(d=>!followingHashes.includes(d.Hash)).filter(d=>d.Hash!==this.props.me.Hash).map((d)=>
    					<MiniProfile viewProfile={this.props.viewProfile} data={d} key={i++} follow={this.follow} />
    				)
    			}
    		</div>
	    )
	}
}

export default Channels
