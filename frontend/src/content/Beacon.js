import React, { Component } from 'react'
import Image from '../utils/Image.js'

class Beacon extends Component {
	constructor(props){
		super( props )
		this.state = {
			historyData : null
		}
	}
	render() {
		return (
			<div className="beacon-front">
				<Image literal_src="beacon.png"/>
				<p>
					Beacon, is a distributed podcast app based on <a href="https://holochain.org" target="_blank" rel="noopener noreferrer" style={{textDecoration:'underline'}}>holochain</a>
				</p>
			</div>
		)
	}
}

export default Beacon