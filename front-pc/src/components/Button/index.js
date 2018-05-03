import React,{ Component } from 'react'

import './style.css'

class Button extends Component {
	
	render(){
		const {disabled,onClick}=this.props
		return (
			<button disabled={disabled} onClick={onClick} className='btn'>
				{this.props.children}
			</button>
		)
	}
}

export default Button