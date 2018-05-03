import React,{ Component } from 'react'
import { Layout, Menu } from 'antd'
import { observer } from 'mobx-react'
import { Link,withRouter } from 'react-router-dom'
import {toJS} from 'mobx'

import { profileStore } from '../../store'
import './style.css'

const { Sider } = Layout
const { SubMenu } = Menu

@withRouter
@observer
class SiderBar extends Component {
	componentDidMount(){
		const { userMenus }=profileStore
		const { state }=this.props.location

		if(!state){
			this.props.history.push(`/home${userMenus[0].childrenModule[0].linkTo}`,{SubMenuKey:['0'],ItemMenuKey:['0-0'],SubMenuName:userMenus[0].name,ItemMenuName:userMenus[0].childrenModule[0].name})
		}

	}
	render(){
		const { userMenus } = profileStore
		const { state } = this.props.location
		
		return (
			<Sider className='sider' width={200}>
	    		<Menu
			        mode='inline'
			        defaultSelectedKeys={state ? state.ItemMenuKey : ['0-0']}
			        defaultOpenKeys={state ? state.SubMenuKey : ['0']}
			        style={{ height: '100%', borderRight: 0 }}
		        >
		        	{userMenus.map((subMenu,i)=>
		        		<SubMenu 
		        			key={`${i}`} 
		        			title={<span>{subMenu.name}</span>}
		        		>
		        			{subMenu.childrenModule.map((chdMenu,k)=>
		        				<Menu.Item key={`${i}-${k}`}>
		        					<Link 
		        						to={{
		        							pathname:`/home${chdMenu.linkTo}`,
		        							state:{SubMenuKey:[`${i}`],ItemMenuKey:[`${i}-${k}`],SubMenuName:subMenu.name,ItemMenuName:chdMenu.name}
		        						}}
		        					>
		        						{chdMenu.name}
		        					</Link>
		        				</Menu.Item>
		        			)}
	        			</SubMenu>
		        	)}
			        
		        </Menu>
	    	</Sider>
		)
	}
}

export default SiderBar