import React, { Component } from 'react';

class Nav extends Component {
	constructor(props){
		super(props)
		this.handleEvent = this.handleEvent.bind(this)
		this.myRef = React.createRef()
	}
	handleEvent(e){
		e.preventDefault()
		this.myRef.current.checked = ''
		this.props.setCurrent(e)
	}
	render() {
    	return (
	    	<nav style={{opacity:this.props.opacity}}>
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
	          <input type="checkbox" id="nav-check" ref={this.myRef} />
	          <div className="nav-links">
	            <a onClick={this.handleEvent} data-target='dashboard' >Dashboard    </a>
	            <a onClick={this.handleEvent} data-target='myChannel' >My Channel   </a>
	            <a onClick={this.handleEvent} data-target='following' >Following    </a>
	            <a onClick={this.handleEvent} data-target='followers' >Followers    </a>
	            <a onClick={this.handleEvent} data-target='channels'  >Search People</a>
	          </div>
	        </nav>
        )
	}
}


export default Nav;
