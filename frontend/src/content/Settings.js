import React, { Component } from 'react'
import Ajax from '../Ajax.js'

class Settings extends Component {
	constructor(props){
		super( props )
		this.state = {current:'Configuration'}
		this.change = this.change.bind(this)
	}
	theme(e){
		// e.preventDefault()
		// e.target.checked = 'true'
		document.body.className = e.target.getAttribute('data')
	}
	change(e){
		e.preventDefault()
		this.setState({current:e.target.getAttribute('data')})
	}
	render() {
		return (
			<div id="settings">
				<aside>
					<h3>Options</h3>
					<a href="/" onClick={this.change} data="Configuration">Configuration</a>
					<a href="/" onClick={this.change} data="Statistics">Statistics</a>
					<a href="/" onClick={this.change} data="History">History</a>
				</aside>
				<section>
					<section style={{display:this.state.current==="Configuration"?'block':'none'}}>
						<h2>Configuration</h2>
						<div className="silver-box">
							Theme:
							<br/>
							Dark <input onChange={this.theme} data="dark" type="radio" name="theme" defaultChecked="true"/>
							<br/>
							Light <input onChange={this.theme} data="light" type="radio" name="theme"/>
						</div>
					</section>
					<section style={{display:this.state.current==="Statistics"?'block':'none'}}>
						<h2>Statistics</h2>
					</section>
					<section style={{display:this.state.current==="History"?'block':'none'}}>
						<h2>History</h2>
					</section>
				</section>
			</div>
		)
	}
}

export default Settings
