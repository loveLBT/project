import React,{ Component } from 'react'
import { message,Icon } from 'antd'

import * as ImgUrl from '../constants/ImgUrl'
import { profileStore } from '../store' 

class Login extends Component {
	constructor(props){
		super(props)

		this.state={
			phone:'',
			password:'',
			btnLoading:false
		}
	}
	componentDidMount(){
		this.mounted=true
	}
	componentWillUnmount(){
		this.mounted=false
	}

	handleChange(name,e){
		this.setState({
			[name]:e.target.value
		})
	}
	async handleSubmit(e){
		e.preventDefault()
		const {phone,password}=this.state
		if(phone===''){
			message.warning('请输入账号');
		}else if(password===''){
			message.warning('请输入密码');
		}else{
			try{
				this.setState({btnLoading:true})
				await profileStore.login(phone,password)
				
				if(this.mounted){
					this.setState({btnLoading:false})
				}
			}catch(e){
				this.setState({btnLoading:false})
			}	
		}
		
	}
	render(){
		const {btnLoading}=this.state

		return (
			<div className='login' style={{backgroundImage:`url(${ImgUrl.LoginUrl})`}}>
				
				<form onSubmit={this.handleSubmit.bind(this)}>
					<dl className='form_box'>
						<dt className='title'>
							<strong>定值单管理系统</strong>
						</dt>
						<dd className='user'>
							<input onChange={this.handleChange.bind(this,'phone')} type='text' placeholder='账号'  />
						</dd>
						<dd className='pwd'>
							 <input onChange={this.handleChange.bind(this,'password')} type='password' placeholder = '密码'   />
						</dd>
						<dd className='submit'>
							<button disabled={btnLoading} type='submit' >
								{btnLoading && <Icon type="loading" />}
								立即登入
							</button>
						</dd>
					</dl>
				</form>

			</div>
		)
	}
}

export default Login