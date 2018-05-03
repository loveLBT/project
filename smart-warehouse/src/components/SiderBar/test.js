/*import React,{ Component } from 'react'
import { Layout, Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'
import objectAssign from 'object-assign'

import './style.css'

const { SubMenu } = Menu
const { Sider } = Layout

class SiderBar extends Component {
	static defaultProps={
		collapsed:false,
		menus:[],
	}
	renderMenus(menus,opts){
		return menus.map((menu,index)=>{
			if(menu.childrenMenus){
				opts.length=menu.childrenMenus.length
				opts.subMenuKey+=1
				opts.subMenukeys_Str+=opts.subMenuKey

				return (
					<SubMenu
						key={`${opts.subMenuKey}`}
						className='menu_item'
			            title={<span><Icon type={menu.icon} /><span>{menu.name}</span></span>}

					>
						{this.renderMenus(menu.childrenMenus,opts)}
					</SubMenu>
				)
			}else{
				opts.menuItemKey+=1
				let subMenukeys_Str=opts.subMenukeys_Str
				if(opts.index===opts.length-1){
					opts.index=0
					opts.subMenukeys_Str=opts.subMenukeys_Str.slice(0,opts.subMenukeys_Str.length-1)
				}else{
					opts.index+=1
				}
				
				return (
					<Menu.Item key={`${opts.menuItemKey}`}>
            			<Link 
            				to={{
            					pathname:`/home${opts.moduleIndex}${menu.link}`,
            					state:objectAssign({},opts.locationState,{subMenuKeys:`${subMenukeys_Str}`,menuItemKey:`${opts.menuItemKey}`})
            				}}
            			>
            				{menu.name}
            			</Link>
            		</Menu.Item>
				)
			}
		})
	}
	render(){
		const { collapsed,menus,locationState,moduleIndex }=this.props
		const renderMenusOpts={
			locationState,
			moduleIndex,
			menuItemKey:0,
			subMenuKey:0,
			length:0,
			index:0,
			subMenukeys_Str:'',
		}

		return (
			<Sider
		        collapsed={collapsed}
		        className='sider'
	        >
	        	<div className='sider_brand'>

	            	<a href='/'>
	            		<Icon type="codepen-circle" />
	            		<span>智能仓库管理</span>
	            	</a>
	            </div>
	            
	            <Menu 
	            	theme='dark' 
	            	defaultOpenKeys={locationState.subMenuKeys?locationState.subMenuKeys.split(''):['1']}
	            	selectedKeys={[locationState.menuItemKey || '1']} 
	            	mode='inline'
	            	className='menu'
	            >	
	            	{this.renderMenus(menus,renderMenusOpts)}
	            </Menu>
	        	
	        </Sider>
		)
	}
}

export default SiderBar*/