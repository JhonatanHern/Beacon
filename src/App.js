import React, { Component } from 'react'

import './App.css'
import Nav from './Nav.js'
import Content from './Content.js'
import Triangles from './Triangles.js'
import Ajax from './Ajax.js'
import Audio from './utils/Audio.js'

class App extends Component {
  constructor(props){
  	super(props)
  	this.state = {
  		current : '',
      me:null,
      opacity:'1',
      audioSrc:'$UICIDEBOY$ - I NO LONGER FEAR THE RAZOR GUARDING MY HEEL.mp3'
  	}
  	this.setCurrent = this.setCurrent.bind( this )
  }
  async setCurrent(e){
  	let dataTarget = e.target.getAttribute('data-target')

  	let functionName = 'get' +
  		dataTarget[0].toUpperCase() +
  		dataTarget.slice(1)
  	
  	this.setState({
  		data : await Ajax[ functionName ](),
  		current : dataTarget
  	})
  }
  render() {
    return (
      <div>
        <Nav opacity={this.state.opacity} setCurrent={this.setCurrent}/>
        <Triangles />
        <Content opacity={this.state.opacity} me={this.state.me} current={this.state.current} data={this.state.data}/>
        <Audio src={this.state.audioSrc}/>
      </div>
    );
  }
}

export default App;
