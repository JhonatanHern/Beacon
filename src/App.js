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
  	e.preventDefault()
  	this.setState({
  		current : e.target.getAttribute('data-target')
  	})

  	let functionName = 'get' +
  		e.target.getAttribute('data-target')[0].toUpperCase() +
  		e.target.getAttribute('data-target').slice(1)
  	
  	this.setState({
  		data: await Ajax[ functionName ]()
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
