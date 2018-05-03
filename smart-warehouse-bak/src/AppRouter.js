import React,{ Component } from 'react'
import { observer } from 'mobx-react'
import { BrowserRouter as Router, Route,Switch,Redirect } from 'react-router-dom'
import _ from 'lodash'

import { profileStore } from './store'
import Home from './containers/Home'
import Login from './containers/Login'

@observer
class AppRouter extends Component {
	render(){
		const isLogin=!(_.isEmpty(profileStore.userInfo))

		return (
			<Router>
				<Switch>
					<Redirect exact from='/' to={isLogin?'/home':'/login'} />
					<Route path='/home' render={()=>(isLogin?<Home />:<Redirect to='/login' />)} />
					<Route path='/login' render={()=>(isLogin?<Redirect to='/home' />:<Login />)} />			
				</Switch>
			</Router>
		)
	}	
}

export default AppRouter

