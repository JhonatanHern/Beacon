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
		document.body.className = e.target.getAttribute('data')
	}
	async change(e){
		e.preventDefault()
		const target = e.target.getAttribute('data')
		switch(target){
			case 'History':
				const history = await Ajax.getHistory()
				this.setState({history:history})
				break
			case 'Statistics':
				const stats = await Ajax.getStatistics()
				this.setState({stats:stats})
				break
			default:
				//no need to do anything
		}
		this.setState({current:target})
	}
	render() {
		let pausesPerSong = 0,
			allSongs = [],
			allPetitions = []
		if (this.state.stats) {
			allSongs = this.state.stats.reduce((acum,current)=>current.songs.concat(acum),[])
			allPetitions =  allSongs.reduce((acum,current)=>current.petitions.concat(acum),[])
		}
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
						Albums: {
							this.state.stats &&
							this.state.stats.length
						}
						<br/>
						Songs: {
							this.state.stats &&
							this.state.stats.reduce((acum,current)=>current.songs.length+acum,0)
						}
						<br/>
						Total reproductions: {allPetitions && allPetitions.length}
						<br/>
						Average reproductions per song: {
							allSongs.length ?
								(allSongs.reduce((acum,current)=>current.petitions.length+acum,0)/allSongs.length).toFixed(2)
							:
								'0'
						}
						<br/>
						Average pauses per song: {
							allPetitions &&
							allPetitions.length ?
								(allPetitions.reduce((acum,current)=>current.actions.filter(pet=>pet.Entry.type==='pause').length+acum,0)/allPetitions.length).toFixed(2)
							:
								'0'
						}
						<br/>
						Average finished songs: {
							allPetitions &&
							allPetitions.length ?
								(allPetitions.reduce((acum,current)=>current.actions.filter(pet=>pet.Entry.type==='end').length+acum,0)/allPetitions.length).toFixed(2)*100
							:
								'0'
						}%
					</section>
					<section className="track-holder" style={{display:this.state.current==="History"?'block':'none'}}>
						<h2>History</h2>
						{
							this.state.history &&
							this.state.history.map((e,i)=>
								//using { Entry : e.Entry.episode }
								//is a workaround for reusing the Track component
								//without changing it's intern behavior
								<Track data={ { Entry : e.Entry.episode , Hash : ''} } play={this.props.play} key={i}/>
							)
						}
					</section>
				</section>
			</div>
		)
	}
}

export default Settings
