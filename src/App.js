import React, { Component } from 'react'

import './App.css'
import Nav from './Nav.js'
import Content from './Content.js'
import Triangles from './Triangles.js'
import Ajax from './Ajax.js'

class App extends Component {
  constructor(props){
  	super(props)
  	this.state = {
  		current : ''
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
        <Nav setCurrent={this.setCurrent}/>
        <Triangles />
        <Content current={this.state.current} data={this.state.data}/>
      </div>
    );
  }
}

export default App;
