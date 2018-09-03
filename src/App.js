import React, { Component } from 'react';

import './App.css';
import Nav from './Nav.js';
import Content from './Content.js';
import Triangles from './Triangles.js';

class App extends Component {
  constructor(props){
  	super(props)

  }
  render() {
    return (
      <div>
        <Nav />
        <Triangles />
        <Content />
      </div>
    );
  }
}

export default App;
