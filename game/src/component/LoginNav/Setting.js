import React,{ Component } from 'react'
import {
    ScrollView,
    Switch,
    Text
} from 'react-native'
import { observer } from 'mobx-react/native'

import {
    ListItem
} from '../../../UiLibrary'
import {
    profileStore
} from '../../storeSingleton.js'

@observer
class Setting extends Component {
	constructor(props) {
		super(props)

		this.state={
			colorTrueSwitchIsOn:profileStore.userInfo.vibration
		}
		
	}
	renderSwitch(){
		return (
			<Switch 
				onValueChange={(value)=>{
					this.setState({colorTrueSwitchIsOn:value})
					profileStore.updateUserInfo('vibration',value)
				}}
				value={this.state.colorTrueSwitchIsOn}
			/>
		)
	}
	render(){
		return (
			<ScrollView>
				 <ListItem.Header
                    title="消息提醒设置"
                />
                <ListItem.Label
                    labelText="新消息震动"
                    rightComponent={this.renderSwitch.bind(this)}
                />
			</ScrollView>
		)
	}
}

export default Setting