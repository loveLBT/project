import React,{ Component } from 'react'
import { Switch,Route,withRouter } from 'react-router-dom'
import { observer } from 'mobx-react'

import { orderFormStore } from '../store'
import OrderForm from './OrderForm'

@withRouter
@observer
class HomeRouter extends Component {
	componentDidMount(){
		orderFormStore.getInitData()
	}
	render(){
		const { match }=this.props

		return (
			<div>
				<Switch>
					{orderFormStore.initData && <Route path={`${match.url}/orderform`} component={OrderForm} />}
				</Switch>
				
			</div>
		)
	}
}

export default HomeRouter