import React,{ Component } from 'react'
import { observer } from 'mobx-react/native'
import { StyleSheet,View,Text,ActivityIndicator,TouchableOpacity } from 'react-native'

import { profileStore,socketStore } from './storeSingleton'

import NotLoginNav from './component/NotLoginNav'
import LoginNav from './component/LoginNav'

@observer
class Game extends Component {
	render(){
		if(profileStore.isTryRestoreFromStorage){
			if(profileStore.userInfo){
				return (
					<LoginNav />
				)
			}else{
				return (
					<NotLoginNav />
				)
			}
		}else{
			return (
				<ActivityIndicator 
					style={styles.activityIndicatorContainer}
				/>
			)
		}
	}
}

const styles = StyleSheet.create({
	container:{
		flex:1
	},
    activityIndicatorContainer: {
        flex: 1
    }
})

export default Game
