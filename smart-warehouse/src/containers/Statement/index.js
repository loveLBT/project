import React,{ Component } from 'react'
import { Switch,Route } from 'react-router-dom'

import Log from './Log'

class Statement extends Component {
	render(){
		const { match }=this.props

		return (
			<Switch>
				<Route path={`${match.url}`} component={Log} />
			</Switch>
		)
	}
}

export default Statement