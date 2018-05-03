import React from 'react'
import { Switch,Route,withRouter } from 'react-router-dom'

import OrderForm from './OrderForm'

const HomeRouter=withRouter(({match})=>{
	return (
		<div>
			<Switch>
				<Route path={`${match.url}/orderform`} component={OrderForm} />
			</Switch>
			
		</div>
	)
})

export default HomeRouter