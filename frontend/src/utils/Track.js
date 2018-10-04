import React from 'react'
import Allert from './Allert.js'

/* This component does so much heavy work and it's behavior differs so much from
 * the others components, that this doesn't use the Ajax class.
 * 
 * This component's ajax was implemented from scratch. 
*/

class Track extends React.Component{
	constructor(props){
		super(props)
		this.state = {commentRating:0}
		this.viewComments = this.viewComments.bind(this)
		this.comment = this.comment.bind(this)
		this.rate = this.rate.bind(this)
		this.commentRef = React.createRef()
	}
	async viewComments( e ){
		if ( e && e.preventDefault ) {
			e.preventDefault()
		}
		const response = await fetch('/fn/holoc/getComments',{
			method:'POST',
			body:this.props.data.Entry.datalink
		})
		if ( ! response.ok ) {
			Allert.message('There was an error when looking for the comments, check your internet connection.')
			return
		}
		const data = await response.json()
		this.setState({ comments : data })
	}
	async comment(e){
		e.preventDefault()
		if (!this.commentRef.current.value) {
			alert('comment text required')
			return
		}
		if ( ! this.state.commentRating ) {
			alert('rating required')
			return
		}
		const response = await fetch('/fn/holoc/comment',
			{
				method:'POST',
				body:JSON.stringify({
					text : this.commentRef.current.value,
					rank : this.state.commentRating,
					base : this.props.data.Entry.datalink
				})
			})
		if (!response.ok) {
			Allert.message({color:'red',message:'Error uploading comment'})
			return
		}
		this.commentRef.current.value = ''
		this.setState({commentRating:0})
		const hash = await response.text()
		console.log('Hash:')
		console.log(hash)
		this.viewComments()
	}
	rate(num){
		this.setState({commentRating:num})
	}
	render(){
		return (
			<div className='play-track'>
				<div onClick={ev=>this.props.play(this.props.data.Entry.datalink)}>
					<span role="img" aria-label="play button">▶️</span>
					<small>{ this.props.data.Entry.name }</small>
				</div>
				{this.state.comments?
					this.state.comments.length?
						<div className='comments-list'>
							{this.state.comments.map((c,i)=>(
								<div key={i}>
									<a href="">{c.Entry.from}</a>
									<br/>
									{c.Entry.text}
									<br/>
									<div className="star-holder">
										{
											(()=>{
												const res = []
												for (var i = 0; i < c.Entry.rank; i++) {
													res.push(<img
														src="star.png"
														key={i}
														className="star-demo"
														alt="star"
														/>)
												}
												return res
											})()
										}
									</div>
								</div>
							))}
						</div>
					://else
						<a href="/" onClick={e=>e.preventDefault()}>No comments in this track</a>
				://else
					<a href="/" onClick={this.viewComments}>view comments</a>
				}
				<a href="/" style={{marginLeft:'.5em'}} onClick={e=>{e.preventDefault();this.setState({display:!this.state.display})}}>comment</a>
				<section className="comment-panel" style={{display:this.state.display?'flex':'none'}}>
					<textarea ref={this.commentRef} placeholder="Insert your comment"></textarea>
					<small>
						Rate this track:
						{[1,2,3,4,5].map((n,i)=>{
							return <img
								className="star"
								key={i}
								src="star.png"
								alt="star"
								onClick={e=>this.rate(n)}
								style={{filter:n>this.state.commentRating?'grayscale(100%)':'none'}}
								/>
						})}
					</small>
					<div className='butt-container'><button onClick={this.comment}>Comment</button></div>
				</section>
			</div>
		)
	}
}

export default Track