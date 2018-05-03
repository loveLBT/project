import React from 'react'
import { observer } from 'mobx-react'
import {
  	BrowserRouter as Router,
 	Route,
 	Switch,
 	Redirect
} from 'react-router-dom'

import { profileStore } from './store'
import Login from './containers/Login'
import Home from './containers/Home'

@observer
class AppRouter extends React.Component {
	render(){
		const {isLogin}=profileStore

		return (
			<Router>
				<Switch>
					<Route
						exact 
						path='/' 
						render={()=>(
							isLogin?<Redirect to='/home' />:<Redirect to='/login' />
						)} 
					/>
					<Route 
						path='/login' 
						render={()=>(
							isLogin?<Redirect to='/home' />:<Login />
						)} 

					/>
					<Route
						path='/home' 
						render={()=>(
							isLogin?<Home />:<Redirect to='/login' />
						)} 
					/>
				</Switch>
			</Router>
		)
	}
}

export default AppRouter