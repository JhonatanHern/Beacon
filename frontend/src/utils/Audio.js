/* 
 * Audio.js
 * 
 * This is a pretty long component (for React standards)
 * It handles everything related to audio, it even
 * includes the ajax code to retrieve the audio from the database.
 * It also handles the progressbar, the volume & the audio download.
 * 
 * Visually, you can find it as the audio bottom bar with the audio
 * controls.
 * 
 * Good luck editing this code, this is the most important component
 * of the entire app.
 * 
 * reach me at jhonatanhernandez998@gmail.com
*/

import React, { Component } from 'react'

class Audio extends Component {
	constructor(props){
		super( props )

		this.audioRef = React.createRef()

		this.play         = this.play.bind(this)
		this.setTime      = this.setTime.bind(this)
		this.updateSrc    = this.updateSrc.bind(this)
		this.playClick    = this.playClick.bind(this)
		this.handleEnd    = this.handleEnd.bind(this)
		this.updateBar    = this.updateBar.bind(this)
		this.volumeClick  = this.volumeClick.bind(this)
		this.notifyPause  = this.notifyPause.bind(this)
		this.sendPetition = this.sendPetition.bind(this)
		this.state = {
			petitionHash : null ,
			progress : 0 ,
			volume : .9 ,
			play : false
		}
		this.updateSrc( true )
		setInterval(this.updateBar,300)
	}
	async sendPetition(){
		if (!this.props.songHash) {
			return
		}
		const response = await fetch('/fn/holoc/petition',{
			method:'POST',
			body:this.props.songHash
		})
		if (!response.ok) {
			console.log('response failed:',response)
			return
		}
		const resData = await response.text()
		console.log( 'petition hash:' , resData )
		this.setState({ petitionHash : resData })
	}
	updateBar(){
		if (this.audioRef.current) {
			let calculated = (this.audioRef.current.currentTime*100)/this.audioRef.current.duration
			if (this.props.demo) {
				calculated *= 10
			}
			this.setState({
				progress : calculated
			})
		}
	}
	updateSrc(isFirstCall){
		const props = this.props
		if ( props.src ) {
			if (/\.mp3$/.test(props.src)) {//simple file
				fetch(props.src)
				.then((response) => {
					if(response.ok) {
						return response.blob()
					}
					throw new Error('Network error.')
				})
				.then((myBlob) => {
					var objectURL = URL.createObjectURL(myBlob)
					this.setState({ src: objectURL })
				})
				.catch((error) => {
					console.log('There has been a problem with your fetch operation: ', error.message)
				})
			} else {//file in the holochain, this should be a hash
				fetch('/fn/holoc/getTrack'+(this.props.demo?'Demo':''),{
					method : 'POST',
					body : props.src ? props.src : ''
				})
				.then((response) => {
					if(response.ok) {
						return response.json()
					}
					throw new Error('Network error.')
				})
				.then((data) => {
					data.sort( ( a , b ) => a.index - b.index )
					const fd = data.map(b=>b.data).join('')
					console.log('final length: ' + fd.length)
					this.setState({ src: fd })
					setTimeout(()=>this.play(),100)
					this.sendPetition()//starts tracking
				})
				.catch((error) => {
					console.log('There has been a problem with your fetch operation: ', error.message)
				})
			}
		}
	}
	downloadBlob(blob){
        let a = document.createElement('a')
        a.href = window.URL.createObjectURL(blob)
        a.download = "track.mp3"
        a.click()
	}
	componentDidUpdate(pp){
		if (pp.src === this.props.src && pp.ar === this.props.ar)
			return
		this.updateSrc(false)
	}
	play(){
		this.audioRef.current.play()
		this.setState({play:true})
	}
	async notifyPause(){
		if (!this.state.petitionHash) {
			return
		}
		const response = await fetch('/fn/holoc/action',{
			method : 'POST',
			body : JSON.stringify({
				petitionHash : this.state.petitionHash,
				moment : Math.floor((this.audioRef.current.currentTime*100)/this.audioRef.current.duration),
				type : 'pause'
			})
		})
		if (!response.ok) {
			console.log('response failed:',response)
			return
		}
		const resData = await response.text()
		console.log(resData)
	}
	playClick(e){
		e.preventDefault()
		if (this.state.play) {
			this.notifyPause()
			this.audioRef.current.pause()
		} else {
			this.audioRef.current.play()
		}
		this.setState({play:!this.state.play})
	}
	async handleEnd(e){
		this.setState({play:false})
		const response = await fetch('/fn/holoc/action',{
			method : 'POST',
			body : JSON.stringify({
				petitionHash : this.state.petitionHash,
				moment : Math.floor((this.audioRef.current.currentTime*100)/this.audioRef.current.duration),
				type : 'end'
			})
		})
		if (!response.ok) {
			console.log('response failed:',response)
			return
		}
	}
	setTime(e){
		e.preventDefault()
		const iw = window.innerWidth
		let barWidth = iw - 100
		barWidth -= barWidth * 0.025
		let clickWidth = e.clientX - 50 - barWidth * 0.0125
		let proportion = clickWidth / barWidth
		//this.setState({progress : ( clickWidth *100 ) / barWidth })
		this.audioRef.current.currentTime = proportion * this.audioRef.current.duration
		if (this.props.demo) {
			this.audioRef.current.currentTime = this.audioRef.current.currentTime / 10
		}
	}
	volumeClick(e){
		let volume = (( window.innerHeight - e.clientY) - 60)/180
		this.audioRef.current.volume = volume
		this.setState({
			volume : volume
		})
	}
	render() {
		return (
			<section id="audio-container">
				<audio onEnded={this.handleEnd} ref={this.audioRef} style={{display:'none'}} src={this.state.src}></audio>
				<span
					id="play"
					onClick={this.playClick}
					className={this.state.play?'pause':''}
					title={this.state.play?'pause':'play'}
					>
				</span>
				<div id="progress-bar">
					<div id="progress-container" onClick={this.setTime}>
						<div id="progress" style={{width:this.state.progress+'%'}} />
					</div>
				</div>
				<span id="volume" title="volume" style={{borderLeft:'1px solid #222'}}>
					<div className="deploy">
						<div className="volume-progress-bar" onClick={this.volumeClick}>
							<div className="volume-progress" style={{height:this.state.volume*100 + '%'}}>
								
							</div>
						</div>
					</div>
				</span>
			</section>
		)
	}
}

export default Audio;
