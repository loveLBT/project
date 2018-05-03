import React,{ Component } from 'react'
import { Input } from 'antd'

class NumericInput extends Component {
	handleChange(e){
		const { value } = e.target
		const reg = /^([1-9][0-9]*)?$/;
		    if ((!isNaN(value) && reg.test(value)) || value === '') {
		        this.props.onChange(value)
	    	}
	}
	render(){
		const { value } = this.props
		return (
			<Input 
				{...this.props}
				onChange={this.handleChange.bind(this)}
			/>
		)
	}
}

export default NumericInput