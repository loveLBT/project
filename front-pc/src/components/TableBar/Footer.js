import React, { Component } from 'react'
import { Button } from 'antd'

class Footer extends Component{
	render(){
		const {data}=this.props

		return (
			<div>
				<div className='box'>
					{data.btns.map((btn,index)=>
						<Button onClick={btn.onClick} key={index} type="primary" ghost>{btn.text}</Button>
					)}
				</div>
				{data.color && 
					<div className='box'>
						<p>
					 		定值单状态背景色描述：
					 		<span className='purple'>编辑中</span>
					 		<span className='transparent'>已执行</span>
					 		<span className='yellow'>待执行</span>
					 		<span className='blue'>二次待执行</span>
					 		<span className='gray'>作废</span>
					 	</p>
					</div>
				}
			</div>
		)
	}
}

export default Footer