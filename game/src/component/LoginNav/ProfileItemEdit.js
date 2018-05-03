import React, { Component } from 'react'
import { observable, action,computed } from 'mobx'
import {observer} from 'mobx-react'
import {
    StyleSheet,
    ScrollView,
    View,
    Text
} from 'react-native'

import {
    Color,
    FontSize,
    Button,
    TextInput
} from '../../../UiLibrary'
import { profileStore } from '../../storeSingleton'

class RightComponentData {
	@observable name=''

	constructor(name) {
		this.name=name
	}

	@computed get isSaveDisabled(){
		return this.name===''
	}

	@action handleSave=()=>{
		console.log(this.name)
	}
}

class RightComponent extends Component {
	render(){
		return (
			<View style={styles.rightComponent}>
				<Button
					isWithOutLine={false}
					textStyle={styles.saveButton}
					onPress={this.props.handleSave}
					disabled={this.props.isSaveDisabled}
				>
					完成
				</Button>
			</View>
		)
	}
}

@observer
class ProfileItemEdit extends Component {
	static navigationOptions=({navigation})=>({
		title:`${navigation.state.params.title}`,
        gesturesEnabled:true,
        headerRight:<RightComponent 
        				handleSave={navigation.state.params.handleSave}
        				isSaveDisabled={navigation.state.params.isSaveDisabled}
        			/>
	})

	rightComponetnData=new RightComponentData(profileStore.userInfo.name)

	componentWillMount() {
		this.props.navigation.setParams({
			isSaveDisabled:this.rightComponetnData.isSaveDisabled,
			handleSave:this.rightComponetnData.handleSave

		})
	}
	handleChangeText(text){
		this.rightComponetnData.name=text

		this.props.navigation.setParams({
			isSaveDisabled:this.rightComponetnData.isSaveDisabled
		})
	}
	render(){
		return (
			<ScrollView style={styles.container}>
				<TextInput.Line 
					value={`${this.rightComponetnData.name}`}
					onChangeText={this.handleChangeText.bind(this)}
				/>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
    rightComponent: {
        flex: 1,
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: Color.BackgroundGrey,
        paddingTop: 20
    },
    saveButton: {
        fontSize: FontSize.Content,
        color: Color.WechatGreen
    }
})

export default ProfileItemEdit
