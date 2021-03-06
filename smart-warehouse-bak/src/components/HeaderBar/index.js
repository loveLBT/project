import React,{ Component } from 'react'
import { Layout, Menu, Icon, Row, Col } from 'antd'
import { Link } from 'react-router-dom'

import './style.css'

const { Header } = Layout

class HeaderBar extends Component {
	static defaultProps={
		handleSettingClick:()=>{},
		handleTriggerClick:()=>{},
		menus:[],
		moduleMenuKey:0
	}
	render(){

		return (
			<Header className='header'>
			    <Row>
			    	<Col span={2}>
			    		<div className='collapsed' onClick={this.props.handleTriggerClick}>
			    			<Icon
				                className='trigger'
				                type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
				            />
			    		</div>
			    	</Col>
			    	<Col span={12}>
			    		<Menu
					    	theme='dark'
					        mode='horizontal'
					        selectedKeys={[`${this.props.moduleMenuKey}`]}
					        className='menu'
				      	>	
					       {this.props.menus.map((menu,i)=>
					       		<Menu.Item key={`${i}`}>
				       				<Link 
				       					to={{
				       						pathname:`/home${menu.link}`,
				       						state:{moduleMenuKey:i,moduleMenuName:menu.link}
				       					}}
				       				>
				       					<Icon className='menu_icon' type={menu.icon} />
				       					<strong>{menu.name}</strong>
				       				</Link>
				       			</Menu.Item>
					        )}
					     </Menu>
			    	</Col>
			    	<Col span={10} style={{textAlign:'center'}}>
			    		<ul className='coustom_menu menu'>
			    			<li className='menu_item'>
			    				<Icon type='logout' />
			    			</li>
			    			<li className='menu_item' onClick={this.props.handleSettingClick}>
			    				<Icon type='setting' />
			    			</li>
			    		</ul>
			    	</Col>
			    </Row>
		    </Header>
		)
	}
}

export default HeaderBar