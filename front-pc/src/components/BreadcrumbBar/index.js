import React from 'react'
import { Breadcrumb } from 'antd'
import { withRouter } from 'react-router-dom'

import './style.css'

const BreadcrumbBar=withRouter((props)=>{
	const { state } = props.location

	return (
		<Breadcrumb className='breadcrumb'>
			<Breadcrumb.Item>首页</Breadcrumb.Item>
		    {state && <Breadcrumb.Item>{state.SubMenuName}</Breadcrumb.Item>}
		    {state && <Breadcrumb.Item>{state.ItemMenuName}</Breadcrumb.Item>}
		</Breadcrumb>
	)
})

export default BreadcrumbBar