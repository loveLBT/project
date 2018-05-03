import React,{ Component } from 'react'
import { TabNavigator,TabBarBottom } from 'react-navigation'
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator'
import Icon from 'react-native-vector-icons/Ionicons'

import SessionListScreen from './SessionList'
import FriendListScreen from './FriendList'
import MyScreen from './My'

const TabNav=TabNavigator(
	{
		SessionList:{
			screen:SessionListScreen,
            navigationOptions:{
                title:'会话',
                tabBarLabel: '会话',
                tabBarIcon:({focused,tintColor})=>(
                    <Icon 
                        name={focused?'ios-home':'ios-home-outline'}
                        size={26}
                        color={tintColor}
                    />
                )
            }
		},
		FriendList:{
			screen:FriendListScreen,
            navigationOptions:{
                title:'通讯录',
                tabBarLabel:'通讯录',
                tabBarIcon:({focused,tintColor})=>(
                    <Icon 
                        name={focused?'ios-cash':'ios-cash-outline'}
                        size={26}
                        color={tintColor}
                    />
                )
            }
		},
		My:{
			screen:MyScreen,
            navigationOptions:{
                title:'我',
                tabBarLabel:'我',
                tabBarIcon:({focused,tintColor})=>(
                    <Icon 
                        name={focused?'ios-lock':'ios-lock-outline'}
                        size={26}
                        color={tintColor}
                    />
                )
            }
		},
	},
	{
        tabBarComponent:TabBarBottom,
        tabBarPosition:'bottom',
        swipeEnabled:false,
        animationEnabled:false,
        lazy:true,
        initialRouteName:'SessionList',
        backBehavior:'none',
        tabBarOptions:{
            activeTintColor:'#1EA114',
            inactiveTintColor:'#BBBAC1',
            labelStyle:{
                fontSize:12
            }
        }
    }
)

export default TabNav