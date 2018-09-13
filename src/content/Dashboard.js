import React, { Component } from 'react'
import PlaylistDemo from '../utils/PlaylistDemo.js'

class Dashboard extends Component {
	constructor(props){
		super( props )
		this.state = {}
		this.sortData = this.sortData.bind(this)
	}
	sortData(){
		let res = []
		this.props.data.forEach(user=>{
			user.playlists.forEach(playlist=>{
				playlist.user = {
					username:user.username,
					address:user.address
				}
				res.push(playlist)
			})
		})
		res.sort((a,b)=>{
			return a.Entry.created >= b.Entry.created
		})
		return res
	}
	render() {
		let data = this.sortData()
    	return (
    		<div>
    			{
    				data.map((d,i)=><PlaylistDemo data={d} key={i}/>)
    			}
    		</div>
	    )
	}
}

export default Dashboard;
