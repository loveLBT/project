import React,{ Component } from 'react'
import { Switch,Route } from 'react-router-dom'

import Instock from './Instock'
import Surroundings from './Surroundings'

class Monitor extends Component {
	render(){
		const { match }=this.props

		return (
			<Switch>
				<Route path={`${match.url}/instock/:id`} component={Instock} />
				<Route path={`${match.url}/surroundings/:id`} component={Surroundings} />
			</Switch>
		)
	}
}

export default Monitor