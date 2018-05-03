import React,{ Component } from 'react'
import { Button,Form,Input } from 'antd'
import TweenOne from 'rc-tween-one'

import './style.css'

const FormItem = Form.Item

class LeftBar extends Component {
	static defaultProps={
		animation:{
			right:0,
			duration:300,
		},
		reverse:false
	}
	render(){
		const { getFieldDecorator }=this.props.form
		
		return (
			<div>
				<TweenOne
					animation={this.props.animation}
			        paused={false}
			        reverse={this.props.reverse}
			        className='leftbar'
				>
					<h3 className='leftbar_title'>用户信息</h3>
					<Form onSubmit={this.handleSubmit} className='leftbar_form'>
						<FormItem>
							{getFieldDecorator('name',{
								rules: [{ required: true, message: '请输入用户名' }]
							})(
								<div className='form_item'>
									<label className='form_item_label'>用户名</label>
									<Input defaultValue='苏忠东' />
								</div>
							)}
						</FormItem>
						<FormItem>
							{getFieldDecorator('password',{
								rules: [{ required: true, message: '请输入密码' }]
							})(
								<div className='form_item'>
									<label className='form_item_label'>新密码</label>
									<Input />
								</div>
							)}
						</FormItem>
						<FormItem>
							{getFieldDecorator('confirm',{
								rules: [
									{ required: true, message: '请输入确认密码' },
								]
							})(
								<div className='form_item'>
									<label className='form_item_label'>确认新密码</label>
									<Input />
								</div>
							)}
						</FormItem>
						<FormItem>
							<Button type='primary'>保存</Button>
						</FormItem>
					</Form>
				</TweenOne>
			</div>
			
		)	
	}	
} 

export default Form.create()(LeftBar) 