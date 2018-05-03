import React,{ Component } from 'react'
import TweenOne from 'rc-tween-one'
import { Form, Input, Button, Checkbox } from 'antd'

import config from '../config/config'
import { profileStore } from '../store'

const FormItem = Form.Item

class Login extends Component {
	constructor(props) {
	  	super(props)
		
		this.animation={
			scale:'1.1',
			duration: 20000,
			yoyo:true,
			repeat:-1
		}
	}
	handleSubmit(e){
   		e.preventDefault()

   		const { form }=this.props
    	form.validateFields(async (err, values) => {
		    if (!err) {
		  		await profileStore.login(values)      
		    }
	    })
    }
	render(){
		const { getFieldDecorator }=this.props.form
		const systemInfo=profileStore.systemInfo

		return (
			<div className='login container'>
				<TweenOne
			        animation={this.animation}
			        paused={false}
			        className='login_bg_img'
			    />
			    <div className='login_box'>
			    	<h1 className='login_box_title'>{config.appTitle}</h1>
			    	<div className='login_block'>
			    		<h3 className='login_block_title'>登录</h3>
			    		<Form onSubmit={this.handleSubmit.bind(this)} className='login_form'>
			    			<FormItem>
			    				{getFieldDecorator('account',{
			    					initialValue:systemInfo.account,
			    					rules:[{required:true,message:'请输入账号'}]
			    				})(
			    					<Input placeholder='账号...' />
			    				)}
			    			</FormItem>
			    			<FormItem>
			    				{getFieldDecorator('password',{
			    					initialValue:systemInfo.password,
			    					rules:[{required:true,message:'请输入密码'}]
			    				})(
			    					<Input type='password' placeholder='密码...' />
			    				)}
			    			</FormItem>
			    			<FormItem>
			    				{getFieldDecorator('remember',{
			    					valuePropName: 'checked',
          							initialValue: true,				
			    				})(
			    					<Checkbox>记住密码</Checkbox>
			    				)}

			    				<Button 
			    					type='primary' 
			    					htmlType='submit' 
			    					className='login_form_button'
			    				>
						            登录
					          	</Button>
			    			</FormItem>
			    		</Form>
			    	</div>
			    </div>
			</div>
		)
	}
}

export default Form.create()(Login) 