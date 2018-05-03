import React,{ Component } from 'react'
import { Switch,Route } from 'react-router-dom'

import Type from './Type'
import Import from './Import'
import Management from './Management'
import Received from './Received'

class Article extends Component {
	render(){
		const { match }=this.props

		return (
			<Switch>
				<Route path={`${match.url}/Type`} component={Type} />
				<Route path={`${match.url}/import`} component={Import} />
				<Route path={`${match.url}/management`} component={Management} />
				<Route path={`${match.url}/received`} component={Received} />
			</Switch>
		)
	}
}

export default Article