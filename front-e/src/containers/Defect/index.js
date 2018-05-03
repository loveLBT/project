import React from 'react'
import { Route,withRouter,Switch } from 'react-router-dom'

import CurrentMission from './CurrentMission'
import HistoricalDefects from './HistoricalDefects'
import QueryDefects from './QueryDefects'

const Defect=withRouter(({match})=>{
	return (
		<div>
			<Switch>
				<Route path={`${match.url}/current`} component={CurrentMission} />
				<Route path={`${match.url}/history`} component={HistoricalDefects} />
				<Route path={`${match.url}/query`} component={QueryDefects} />
			</Switch>
		</div>
	)
})

export default Defect