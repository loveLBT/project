import React,{ Component } from 'react'
import { Layout,Spin } from 'antd'
import { observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'

import { profileStore,siderStore } from '../store'
import HeaderBar from '../components/HeaderBar'
import SiderBar from '../components/SiderBar'
import LeftBar from '../components/LeftBar'
import HomeRouter from './HomeRouter'


const { Content } = Layout

@withRouter
@observer
class Home extends Component {
	componentDidMount(){
		profileStore.loadUserMenus()
	}
	render(){
		const locationState=this.props.location.state || {}
		const moduleMenuKey=locationState.moduleMenuKey || 0

		return (
			<div className='home container'>
				{profileStore.userMenus.length>0?
					<Layout className='container'>
						<SiderBar 
							moduleIndex={profileStore.userMenus[moduleMenuKey].link}
							menus={profileStore.userMenus[moduleMenuKey].childrenMenus} 
							collapsed={siderStore.collapsed} 
							locationState={locationState}
						/>
						<Layout>
							<HeaderBar 
								menus={profileStore.moduleMenus}
								collapsed={siderStore.collapsed}
								handleTriggerClick={siderStore.collapsedChange} 
								handleSettingClick={siderStore.reverseChange} 
								moduleMenuKey={moduleMenuKey}
							/>
							<Content className='content'>
					            <HomeRouter {...this.props} />
					        </Content>
						</Layout>
						<LeftBar reverse={siderStore.reverse} />
					</Layout>:
					<Spin className='loading' size='large' tip="Loading..." />
				}
			</div>
		)
	}
}

export default Home