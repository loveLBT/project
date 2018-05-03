import React,{ Component } from 'react'
import { StackNavigator } from 'react-navigation'
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator'

import LoginScreen from './Login'
import RegisterScreen from './Register'
import ForgetPWDScreen from './ForgetPWD'

const StackNav=StackNavigator(
	{
		Login:{
			screen:LoginScreen
		},
		Register:{
			screen:RegisterScreen
		},
		ForgetPwd:{
			screen:ForgetPWDScreen
		}
	},
	{
		initialRouteName:'Login',	
		mode:'card',
        headerMode:'float',
        transitionConfig:(()=>({
            screenInterpolator:CardStackStyleInterpolator.forHorizontal
        })),
        navigationOptions:{
        	header:null
        }
	}
)

class StackNavIndex extends Component {
    render() {
        return(
            <StackNav />
        )
    }
}

export default StackNavIndex