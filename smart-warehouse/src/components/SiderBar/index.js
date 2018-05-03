import React from 'react'
import { Layout, Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'
import objectAssign from 'object-assign'

import './style.css'

const { SubMenu } = Menu
const { Sider } = Layout

const SiderBar=(props)=> {
	const { collapsed,menus,locationState,moduleIndex }=props
	let subKeys=''
	let itemKeys=''
	let cnt=false
	let subKey=0

	const renderMenus=(arrys)=>{

		return arrys.map((menu,index)=>{
			
			if(menu.childrenMenus){
				subKey+=1
				subKeys+=subKey
				itemKeys=subKeys
				cnt=true
				
				return (
					<SubMenu
						key={subKey}
						className='menu_item'
			            title={<span><Icon type={menu.icon} /><span>{menu.name}</span></span>}

					>
						{renderMenus(menu.childrenMenus)}
					</SubMenu>
				)
			}else{
				if(cnt) subKeys=subKeys.slice(0,subKeys.length-1)
				cnt=false
				return (
					<Menu.Item key={itemKeys+index}>
            			<Link 
            				to={{
            					pathname:`/home${moduleIndex}${menu.link}`,
            					state:objectAssign({},locationState,{itemSelectKey:itemKeys+index})
            				}}
            			>
            				{menu.name}
            			</Link>
            		</Menu.Item>
				)

			}


		})
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
            	defaultOpenKeys={locationState.itemSelectKey?locationState.itemSelectKey.slice(0,locationState.itemSelectKey.length-1).split(''):[]}
            	selectedKeys={[locationState.itemSelectKey || '']} 
            	mode='inline'
            	className='menu'
            >	
            	{renderMenus(menus)}
            </Menu>
        	
        </Sider>
	)
}

SiderBar.defaultProps={
	collapsed:false,
	menus:[],
}

export default SiderBar