import React from 'react'
import FormModal from '../utils/FormModal.js'
import Track from '../utils/Track.js'

const prettifyDate = date =>{
	const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
	return date.toLocaleDateString("en-US",options)
}

const Playlist = props => (
	<FormModal className='normalize'>
		<span className='absolute-icon' onClick={props.close}>X</span>
		<h2>{props.data.data.name}</h2>
		<span>Created on { prettifyDate(new Date(props.data.data.created)) }</span>
		<p>{props.data.data.concept}</p>
		<div className='display-tracks'>
			{
				props.tracklist.length ?
					<React.Fragment>
						<h4>Songs:</h4>
						{Array.from(props.tracklist).map((e,i)=>(
							<Track data={e} play={props.play} key={i}/>
						))}
						{
							props.mine &&
							<button
								style={{fontSize:'1em'}}
								onClick={()=>props.addAudio(props.data.hash)}
								>
								Add Song
							</button>
						}
					</React.Fragment>
				:
					<React.Fragment>
						<h4>No songs found</h4>
						{
							props.mine &&
							<button
								style={{fontSize:'1em'}}
								onClick={()=>props.addAudio(props.data.hash)}
								>
								Add first song
							</button>
						}
					</React.Fragment>
			}
		</div>
	</FormModal>
)

export default Playlist