import React,{ Component } from 'react'
import { Switch,Route } from 'react-router-dom'

import Summary from './Summary'
import Type from './Type'
import Import from './Import'
import Management from './Management'
import Received from './Received'
import Add from './Add'
import Read from './Read'

class Article extends Component {
	render(){
		const { match }=this.props

		return (
			<Switch>
				<Route path={`${match.url}/Type`} component={Type} />
				<Route path={`${match.url}/import`} component={Import} />
				<Route path={`${match.url}/management`} component={Management} />
				<Route path={`${match.url}/received`} component={Received} />
				<Route path={`${match.url}/add`} component={Add} />
				<Route path={`${match.url}/read`} component={Read} />
				<Route path={`${match.url}`} component={Summary} />
			</Switch>
		)
	}
}

export default Article