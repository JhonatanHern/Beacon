import React, { Component } from 'react';

class Nav extends Component {
	render() {
    	return (
	    	<nav>
	          <div className="nav-header">
	            <div className="nav-title">
	              HoloCast
	            </div>
	          </div>
	          <div className="nav-btn">
	            <label htmlFor="nav-check">
	              <span></span>
	              <span></span>
	              <span></span>
	            </label>
	          </div>
	          <input type="checkbox" id="nav-check" />
	          <div className="nav-links">
	            <a href="#">Dashboard</a>
	            <a href="#">My Channel</a>
	            <a href="#">Following</a>
	            <a href="#">Channels</a>
	          </div>
	        </nav>
        )
	}
}


export default Nav;
