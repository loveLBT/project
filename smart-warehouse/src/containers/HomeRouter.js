import React,{ Component } from 'react'
import { Switch,Route } from 'react-router-dom'

import Monitor from './Monitor'
import Article from './Article'
import Statement from './Statement'
import SysManage from './SysManage'

class HomeRouter extends Component {
	render(){
		const { match }=this.props

		return (
			<Switch>
				<Route path={`${match.url}/monitor`} component={Monitor} />
				<Route path={`${match.url}/article`} component={Article} />
				<Route path={`${match.url}/statement`} component={Statement} />
				<Route path={`${match.url}/SysManage`} component={SysManage} />
				
			</Switch>
		)
	}
}

export default HomeRouter