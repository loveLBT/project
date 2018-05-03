import React,{ Component } from 'react'
import { Breadcrumb } from 'antd'

import './style.css'

class HeaderBar extends Component {
	render(){
		return (
			<Breadcrumb 
				style={{ margin: '16px 0' }}
				className='breadcrumb'
			>
		        <Breadcrumb.Item>Home</Breadcrumb.Item>
		        <Breadcrumb.Item>List</Breadcrumb.Item>
		        <Breadcrumb.Item>App</Breadcrumb.Item>
	        </Breadcrumb>
		)
	}
}

export default HeaderBar