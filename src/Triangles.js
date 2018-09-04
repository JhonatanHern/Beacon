import React, { Component } from 'react';

class Triangles extends Component {
	constructor(props){
		super( props )
		this.state = {triangles:[]}
		this.triangleCounter = 0
		this.renderedNode = React.createRef( )
		setInterval(()=>{
			this.addTriangle()
		},100)
	}
	addTriangle(){
		let randTo = n => Math.floor( Math.random( ) * n )
		let size = randTo( window.innerWidth * .125 )
		let style = {
			borderWidth : size + 'px',
			top:randTo(window.innerHeight),
			left:randTo(window.innerWidth),
			transform: 'rotate('+randTo(360)+'deg)'
		}
		let node = React.createRef( )
		let triangle = (
			<div style={style} ref={node} key={this.triangleCounter++}/>
			)
		this.setState({triangles:this.state.triangles.concat([triangle])})
		setTimeout(()=>{
			node.current.style.opacity = '0'
		},5000)
		setTimeout(()=>{
			this.setState({triangles:this.state.triangles.filter(t=>{
				return t !== triangle
			})})
		},6990)
	}
	render() {
    	return (
    		<div style={{width:'100vw',height:'100vh',position:'relative',overflow:'hidden'}}>
	    		<div ref={this.renderedNode} id='cover'>
		    		{this.state.triangles}
		    	</div>
	    	</div>
	    	)
	}
}


export default Triangles;
