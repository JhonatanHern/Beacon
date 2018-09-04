import React, { Component } from 'react';

class Nav extends Component {
	render() {
    	return (
	    	<nav>
	          <div className="nav-header">
	            <div className="nav-title">
	              Holo-Casting
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
	            <a href="" onClick={this.props.setCurrent} data-target='dashboard' >Dashboard</a>
	            <a href="" onClick={this.props.setCurrent} data-target='myChannel' >My Channel</a>
	            <a href="" onClick={this.props.setCurrent} data-target='following' >Following</a>
	            <a href="" onClick={this.props.setCurrent} data-target='channels' >Channels</a>
	          </div>
	        </nav>
        )
	}
}


export default Nav;
