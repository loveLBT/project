import React,{ Component } from 'react'
import { Layout } from 'antd'
import { observer } from 'mobx-react'

import HeaderBar from '../components/HeaderBar'
import SiderBar from '../components/SiderBar'
import BreadcrumbBar from '../components/BreadcrumbBar'
import HomeRouter from './HomeRouter'
import { profileStore } from '../store'

const { Content } = Layout

@observer
class Home extends Component {
	componentDidMount(){
		profileStore.setUserInfoStorage()
		profileStore.loadUserMenus()
	}

	render(){
		const bgName=profileStore.systemInfo.bgName
		const { userMenus }=profileStore
		const homeStyle={
			backgroundImage:`url(${require('../images/skin/big/'+bgName)})`
		}

		return (
			<div className='home' style={homeStyle}>
				{userMenus.length>0 && 
					<Layout>
						<HeaderBar />

					    <Layout>
					    	<SiderBar />
					    	
					    	<Layout style={{ padding: '0 24px' }}>
					    		<BreadcrumbBar />
					    		
					    		<Content className='content'>
						         	<HomeRouter />
						        </Content>
					    	</Layout>
					    </Layout>
					</Layout>
				}
			</div>
		)
	}
}

export default Home