import React from 'react'
import FormModal from '../utils/FormModal.js'

const prettifyDate = date =>{
	const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
	return date.toLocaleDateString("en-US",options)
}

const Playlist = props => (
	<FormModal className='normalize'>
		<span className='absolute-icon' onClick={props.close}>X</span>
		<h2>{props.data.name}</h2>
		<span>Created on { prettifyDate(new Date(props.data.created)) }</span>
		<p>{props.data.concept}</p>
		<ul>
			{
				props.tracklist.length ?
					<React.Fragment>
						<h4>Tracks:</h4>
						{Array.from(props.tracklist).map((e,i)=>(
							<div className='playTrack' key={i}>
								<span role="img" aria-label="play button">▶️</span> { e.name }
							</div>
						))}
						{props.mine && <button style={{fontSize:'1em'}} onClick={props.addAudio}>Add Audio</button>}
					</React.Fragment>
				:
					<React.Fragment>
						<h4>No tracks found</h4>
						{props.mine && <button style={{fontSize:'1em'}} onClick={props.addAudio}>Add first audio</button>}
					</React.Fragment>
			}
		</ul>
	</FormModal>
)

export default Playlist