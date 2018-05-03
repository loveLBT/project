import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Company from './Company'
import DeviceManage from './DeviceManage'
import DeviceSub from './DeviceSub'
import DeviceSubTypeManage from './DeviceSubTypeManage'
import DeviceTypeManage from './DeviceTypeManage'
import PathwayManage from './PathwayManage'
import PathwayPermission from './PathwayPermission'
import StaffManage from './StaffManage'
import StaffPermission from './StaffPermission'
import Warehouse from './Warehouse'
import Webside from './Webside'

class SysManage extends Component {
	render() {
		const { match } = this.props
		console.log(this.props);
		return (
			<Switch>
				<Route path={`${match.url}/company`} component={Company} />
				<Route path={`${match.url}/deviceManage`} component={DeviceManage} />
				<Route path={`${match.url}/deviceSub`} component={DeviceSub} />
				<Route path={`${match.url}/deviceSubTypeManage`} component={DeviceSubTypeManage} />
				<Route path={`${match.url}/deviceTypeManage`} component={DeviceTypeManage} />
				<Route path={`${match.url}/pathwayManage`} component={PathwayManage} />
				<Route path={`${match.url}/pathwayPermission`} component={PathwayPermission} />
				<Route path={`${match.url}/staffManage`} component={StaffManage} />
				<Route path={`${match.url}/staffPermission`} component={StaffPermission} />
				<Route path={`${match.url}/warehouse`} component={Warehouse} />
				<Route path={`${match.url}/webside`} component={Webside} />
				<Route path={`${match.url}`} component={Company} />
			</Switch>
		)
	}
}

export default SysManage