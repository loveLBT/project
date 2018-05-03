import React,{ Component } from 'react'
import { Layout, Menu, Row, Col, Dropdown, Icon, message } from 'antd'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'
import axios from 'axios'

import './style.css'
import * as TableColums from '../../constants/TableColums'
import * as ImgUrl from '../../constants/ImgUrl'
import { profileStore } from '../../store'
import ModalBar from '../ModalBar'

const { Header } = Layout

@observer
class HeaderBar extends Component {
	constructor(props){
		super(props)

		this.state={
			modalVisible:false,
		}
	}
	handleMenuClick(e){
		const data={
			bgName:e.item.props.bgName
		}

		profileStore.setSystemInfoStorage(data)
	}
	renderMenu(){
		return <Menu onClick={this.showModal.bind(this)}>
					<Menu.Item key='0'>修改密码</Menu.Item>
			   </Menu>
	}
	renderSkin(){
		return (
			<Menu className='skin_menu' onClick={this.handleMenuClick.bind(this)}>
				{ImgUrl.SkinUrls.map((item,index)=>
					<Menu.Item 
						className='item' 
						key={index}
						bgName={item} 
						style={{backgroundImage:`url(${require('../../images/skin/small/'+item)})`}}
					>
					</Menu.Item>
				)}
				
			</Menu>
		)
	}
	showModal(){
		this.setState({
			modalVisible:true
		})
	}
	handleCancel(){
		this.setState({
			modalVisible:false
		})
	}
	async handleModalOK(data){
		await axios.put('/user_password',data)
				
		message.success('密码修改成')
		this.handleCancel()
	}
	render(){
		const {logout,userInfo}=profileStore
		const {modalVisible}=this.state

		return (
			<Header className='header'>
				<div className='title'>
					<Link to='/'>系统管理</Link>
				</div>
		      	<div className='dropdown_box'>

		      		<Row gutter={16}>
		      			
		      			<Col span={6}>
		      				<Dropdown overlay={this.renderMenu()} trigger={['click']}>
					     		<a className='ant-dropdown-link dd_link' href='javascript:;'>
							      	{userInfo.userName} <Icon type='down' />
							    </a>
					     	</Dropdown>
		      			</Col>
		      			
		      			<Col span={6}>
		      				<Dropdown overlay={this.renderSkin()} trigger={['click']}>
					     		<a className='ant-dropdown-link dd_link' href='javascript:;'>
							      	皮肤 <Icon type='down' />
							    </a>
					     	</Dropdown>
		      			</Col>

		      			<Col span={6}>
		      				<div className='logout'>
		      					<a onClick={logout} href='javascript:;'>
		      						退出 <Icon type="logout" />
		      					</a>
		      				</div>
		      			</Col>

		      			
		      		</Row>
		      	</div>
		      	
		      	<ModalBar.Form 
		      		ref={(form)=>{this.form=form}}
		      		title='修改密码'
		      		visible={modalVisible}
		      		handleModalOK={this.handleModalOK.bind(this)}
		      		onCancel={this.handleCancel.bind(this)}
		      		confirmLoading={profileStore.asyncLoading}
		      		modalData={{}}
		      		initData={{}}
		      		formItems={TableColums.EditPassword}
		      	/>
			</Header>
		)
	}
}

export default HeaderBar