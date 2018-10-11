import React, { Component } from 'react'
import Ajax from '../Ajax.js'
import Track from '../utils/Track.js'

class Settings extends Component {
	constructor(props){
		super( props )
		this.state = {current:'Configuration',theme:'dark'}
		this.change = this.change.bind(this)
	}
	theme(e){
		// e.preventDefault()
		// e.target.checked = 'true'
		document.body.className = e.target.getAttribute('data')
	}
	async change(e){
		e.preventDefault()
		const target = e.target.getAttribute('data')
		if ( target === 'History' ) {
			const history = await Ajax.getHistory()
			this.setState({history:history})
		}
		this.setState({current:target})
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
							Dark <input onChange={this.theme} data="dark" type="radio" name="theme" defaultChecked={document.body.className==='dark'&&true}/>
							<br/>
							Light <input onChange={this.theme} data="light" type="radio" name="theme" defaultChecked={document.body.className==='light'&&true}/>
						</div>
					</section>
					<section style={{display:this.state.current==="Statistics"?'block':'none'}}>
						<h2>Statistics</h2>
					</section>
					<section className="track-holder" style={{display:this.state.current==="History"?'block':'none'}}>
						<h2>History</h2>
						{
							this.state.history &&
							this.state.history.map((e,i)=>
								<Track data={e} play={this.props.play} key={i}/>
							)
						}
					</section>
				</section>
			</div>
		)
	}
}

export default Settings
