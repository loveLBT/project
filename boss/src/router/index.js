import React from 'react'
import {
  	BrowserRouter as Router,
 	Route,
 	Switch,
 	Redirect
} from 'react-router-dom'

import Login from '../containers/Login'
import Home from '../containers/Home'

const userInfo=null

const RootRouter=()=>(
	<Router>
		<Switch>
			<Route path='/login' component={Login} />
			<Route
				exact 
				path='/home' 
				render={()=>(
					userInfo?<Home />:<Redirect to='/login' />
				)} 
			/>
			<Redirect to='/home' />
		</Switch>
	</Router>
)

export default RootRouter