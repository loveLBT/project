import React,{ Component } from 'react'
import { StackNavigator } from 'react-navigation'
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator'

import TabNavScreen from '../TabNav'
import ProfileScreen from './Profile'
import ProfileItemEditScreen from './ProfileItemEdit'
import SettingScreen from './Setting'
import ChatRoomScreen from './ChatRoom'

const StackNav=StackNavigator(
	{
		TabNav:{
			screen:TabNavScreen
		},
        Profile:{
            screen:ProfileScreen
        },
        ProfileItemEdit:{
            screen:ProfileItemEditScreen
        },
        Setting:{
            screen:SettingScreen
        },
        ChatRoom:{
            screen:ChatRoomScreen
        },
	},
	{
		initialRouteName:'TabNav',	
		mode:'card',
        headerMode:'float',
        transitionConfig:(()=>({
            screenInterpolator:CardStackStyleInterpolator.forHorizontal
        })),
        navigationOptions:{
        	headerStyle:{
        		backgroundColor:'#000',
        	},
        	headerTitleStyle:{
	            color:'white',
	            fontSize:18,
	        },
	        headerTintColor:'#fff',
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