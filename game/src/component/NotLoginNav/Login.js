import React,{ Component } from 'react'
import { StyleSheet,View,Text } from 'react-native'
import { profileStore } from '../../storeSingleton'
import {
	FontSize,
	Button,
    Color,
    TextInput
} from '../../../UiLibrary'

class Login extends Component {
	constructor(props) {
		super(props);
		this.state={
			name:'',
			phone:'',
			isCanLogin:false
		}
	}
	async handleLogin(){
        const {name,phone}=this.state
		const body={name,phone}
        await profileStore.login(body)
	}
	handleChangeText(){
		this.setState({
			isCanLogin:this.state.name && this.state.phone
		})
	}
	render(){
		return (
			<View style={styles.container}>
				<TextInput.Label
                    labelText="昵称"
                    labelStyle={styles.labelStyle}
                    autoCapitalize="none"
                    placeholder="请填写昵称"
                    onChangeText={(name) => {
                        this.setState({name}, () => {
                            this.handleChangeText();
                        });
                    }}
                    value={this.state.name}
                    returnKeyType="done"
                />
                <TextInput.Label
                    labelText="手机号"
                    labelStyle={styles.labelStyle}
                    autoCapitalize="none"
                    placeholder="请填写11位手机号"
                    onChangeText={(phone) => {
                        this.setState({phone}, () => {
                            this.handleChangeText();
                        });
                    }}
                    value={this.state.phone}
                    returnKeyType="done"
                />
				<Button
                    style={styles.loginButton}
                    textStyle={styles.loginText}
                    disabled={!this.state.isCanLogin}
                    onPress={this.handleLogin.bind(this)}
                >
                	登录
                </Button>
			</View>
		)
	}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingTop: 70,
        paddingHorizontal: 20
    },
    loginButton: {
        marginVertical: 20,
        borderColor: Color.WechatGreen,
        backgroundColor: Color.WechatGreen
    },
    loginText: {
        color: Color.White,
        fontSize: FontSize.Primary,
        paddingVertical: 10
    },
    labelStyle: {
        textAlign: 'left',
        paddingHorizontal: 0
    }
})

export default Login 