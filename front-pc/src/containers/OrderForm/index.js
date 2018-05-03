import React,{ Component } from 'react'
import { Route,withRouter,Switch } from 'react-router-dom'

import NetWork from './NetWork'
import Executive from './Executive'
import Search from './Search'
import UserManage from './UserManage'
import Station from './Station'
import Linelimits from './Linelimits'
import CentralControl from './CentralControl'
import TableHeader from './TableHeader'

class OrderForm extends Component{
	render(){
		const { match }=this.props

		return (
			<div>
				<Switch>
					<Route path={`${match.url}/network`} component={NetWork} />
					<Route path={`${match.url}/executive`} component={Executive} />
					<Route path={`${match.url}/search`} component={Search} />
					<Route path={`${match.url}/userManage`} component={UserManage} />
					<Route path={`${match.url}/station`} component={Station} />
					<Route path={`${match.url}/linelimits`} component={Linelimits} />
					<Route path={`${match.url}/centralControl`} component={CentralControl} />
					<Route path={`${match.url}/tableHeader`} component={TableHeader} />
				</Switch>
			</div>
		)
	}
}

export default withRouter(OrderForm)