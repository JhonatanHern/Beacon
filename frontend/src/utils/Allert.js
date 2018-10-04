class Allert {
	static setConfig(newConfig){
		for(let key in newConfig){
			if (this.config.hasOwnProperty(key) && key !== 'colors') {
				if (typeof this.config[key] === 'object') {
					for(let key2 in newConfig[key]){
						if(this.config[key].hasOwnProperty(key2)){
							this.config[key][key2] = newConfig[key][key2]
						}
					}
				} else {
					this.config[key] = newConfig[key]
				}
			}
		}
	}
	static message ( config ) {
		if (typeof config === 'string') {
			Allert.displayMessage({
				message:config
			})
			return
		}
		this.displayMessage(config)
	}
	static adjustTop(){
		for (let i = 0; i < this.stack.length; i++) {
			let value = this.stack[i].getAttribute('hval')
			let top = 'calc('+value+' - '+this.stack.reduce((acum,curr,index)=>{
					if( index >= i ){
						return acum
					}else{
						return acum + 10 + curr.offsetHeight
					}
				},0)+'px )'
			this.stack[i].style.top = top
		}
	}
	static displayMessage(messageConfig){
		let div = document.createElement('div')
		if( ! this.stack ){
			this.stack = []
		}
		div.innerText = messageConfig.message
		for(let cssProperty in this.config.style){
			switch(cssProperty){
				case 'top':
					// eslint-disable-next-line
					let value = messageConfig.style && messageConfig.style[ cssProperty ] || this.config.style[ cssProperty ]
					div.setAttribute('hval',value)
					break
				default:
					// eslint-disable-next-line
					div.style[cssProperty] = messageConfig.style && messageConfig.style[ cssProperty ] || this.config.style[ cssProperty ]
			}
		}
		div.style.backgroundColor = this.config.colors[messageConfig.color] || messageConfig.color || this.config.colors.default
		document.body.appendChild( div )
		setTimeout( () => {
			this.stack = this.stack.filter(d=>d!==div)
			div.remove()
			this.adjustTop()
		} , messageConfig.time || this.config.time )
		setTimeout( () => {
			div.style.opacity = 0
		} , ( messageConfig.time || this.config.time ) - Number((messageConfig.style?messageConfig.style.transitionDuration:this.config.style.transitionDuration).split('').filter(c=>/\d/.test(c)).join('') ) )
		this.stack.push(div)
		this.adjustTop()
	}
}
Allert.config = {
	colors : {
		'error':'#f94d40',
		'danger':'#f94d40',
		'default':'#53f940',
		'success':'#53f940',
		'warning':'#f2fc64'
	},
	style:{
		transform : 'translate(calc( -100% - .5em ),calc( -100% - .5em ))',
		transitionDuration : '1200ms',
		borderRadius: '.3em',
		zIndex:'2000000000',
		position : 'fixed',
		maxWidth : '90vw',
		minWidth : '30vw',
		padding:'.5em',
		color : '#000',
		left : '100vw',
		top : '100vh'
	},
	time:5000
}
export default Allert 