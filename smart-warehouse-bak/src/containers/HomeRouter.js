import React,{ Component } from 'react'
import { Switch,Route } from 'react-router-dom'

import Monitor from './Monitor'
import Article from './Article'

class HomeRouter extends Component {
	render(){
		const { match }=this.props

		return (
			<Switch>
				<Route path={`${match.url}/monitor`} component={Monitor} />
				<Route path={`${match.url}/article`} component={Article} />
			</Switch>
		)
	}
}

export default HomeRouter