import React,{ Component } from 'react'
import { observer } from 'mobx-react/native'
import uuid from 'uuid'
import {
    KeyboardAvoidingView,
    RefreshControl,
    StyleSheet,
    ListView,
    Image,
    Text,
    TextInput,
    Platform,
    View
} from 'react-native'

import {
    FontSize,
    Color,
    Button
} from '../../../UiLibrary'
import { profileStore,socketStore } from '../../storeSingleton'

class MessageCell extends Component{
    render(){
        let {message,currentUser}=this.props
        let differentStyle={}

        if(message.from===currentUser){
            differentStyle = {
                flexDirection: 'row-reverse',
                backgroundColor: '#92E649'
            }
        }else{
            differentStyle = {
                flexDirection: 'row',
                backgroundColor: '#FFFFFF'
            }
        }

        return (
            <View
                style={[styles.messageCell,{flexDirection: differentStyle.flexDirection}]}
            >
                <Image 
                    source={{
                        uri:message.ext.avatar
                    }}
                    style={styles.avatar}
                />
                <View
                    style={[styles.contentView,{backgroundColor:differentStyle.backgroundColor}]}
                >
                    <Text style={styles.messageCellText}>{message.msg.content}</Text>
                </View>
                <View style={styles.endBlankBlock} />
            </View>
        )
    }
}

@observer
class ChatRoom extends Component {
    ds=new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!=r2}) 
    userAtPage=0
    userReachEnd=true
    currentMaxRowId=0
    userHasBeenInputed=false

    constructor(props) {
        super(props)
        
        this.toInfo=props.navigation.state.params.toInfo

        this.state={
            refreshing:false,
            textInputHeight:40,
            inputValue:''
        }
    }
    componentWillUnmount() {
        socketStore.currentChatKey=null
    }
    componentDidMount() {
        socketStore.currentChatKey=`${profileStore.userInfo.userId}-${this.toInfo.userId}`
        socketStore.fillCurrentChatRoomHistory()
    }

    async onPullMessage(){
        console.log('pull')
        /*this.userReachEnd=false

        this.setState({refreshing:true})
        //历史消息推入
        await socketStore.fillCurrentChatRoomHistory(++this.userAtPage,8)

        this.setState({refreshing:false})*/
    }
    renderRow(row,sectionID,rowID){
        this.currentMaxRowId=+rowID

        return (
            <MessageCell 
                key={`cell-${rowID}`}
                currentUser={profileStore.userInfo.userId}
                message={row}
            />
        )
    }
    scrollToBottom(){
        let scrollProperties = this.chatListView.scrollProperties

        // 如果组件没有挂载完全，则不进行内容偏移
        if (!scrollProperties.visibleLength) { return }

        // 如果是刷新操作，则不进行滑动
        if (!this.userReachEnd) { return }

        // 如果组件内元素还没渲染完全，则不进行底部偏移
        if (socketStore.currentChatRoomHistory.length - this.currentMaxRowId > 11) { return }
  
        setTimeout(()=>{
           let offsetY = scrollProperties.contentLength - scrollProperties.visibleLength

           this.chatListView.scrollTo({
                y:offsetY>0?offsetY:0,
                animated:this.userHasBeenInputed
           })

        },this._userHasBeenInputed ? 0 : 130)
    }

    onSubmitEditing(){
        this.userReachEnd=true
        //数据组装
        let {userInfo}=profileStore
        let payload={
            from:userInfo.userId,
            to:this.toInfo.userId,
            uuid:uuid.v4(),
            msg:{
                type:'txt',
                content:this.state.inputValue
            },
            ext:{
                avatar:userInfo.avatar,
                name:userInfo.name
            }
        }

        this.setState({inputValue:''})
        //远程发送
        /*socketStore.socket.emit('message',[payload])*/

        // 本地会话列表更新
        socketStore.pushLocalePayload(Object.assign({
            localeExt:{
                toInfo:this.toInfo
            }
        },payload))
        
    }
    
	render(){
        let content=(
            <View style={styles.container}>
                <ListView
                    refreshControl={
                        <RefreshControl 
                            refreshing={this.state.refreshing}
                            onRefresh={this.onPullMessage.bind(this)}
                        />
                    }
                    onEndReached={()=>{
                        this.userReachEnd=true
                    }}
                    onEndReachedThreshold={10}
                    ref={(reference) => { this.chatListView = reference }}
                    dataSource={this.ds.cloneWithRows(socketStore.currentChatRoomHistory.slice())}
                    enableEmptySections={true}
                    onLayout={
                        (event) => {
                            this.scrollToBottom();
                        }
                    }
                    onContentSizeChange={
                        (event) => {
                            this.scrollToBottom();
                        }
                    }
                    renderRow={this.renderRow.bind(this)}
                />

                <View style={styles.bottomToolBar}>
                    <TextInput 
                        style={[styles.input, {
                            height: Math.max(40, this.state.textInputHeight < 180 ? this.state.textInputHeight : 180 )
                        }]}
                        multiline={true}
                        controlled={true}
                        underlineColorAndroid="transparent"
                        returnKeyType='default'
                        value={this.state.inputValue}
                        placeholder={'Type here to send message'}
                        enablesReturnKeyAutomatically={true}
                        onContentSizeChange={
                            (event) => {
                                this.setState({textInputHeight: event.nativeEvent.contentSize.height})
                            }
                        }
                        onChangeText={ (text) => {
                            this.setState({ inputValue: text })
                        }}
                    />

                    <Button
                        style={styles.sendButton}
                        textStyle={styles.sendButtonText}
                        disabled={!this.state.inputValue}
                        onPress={this.onSubmitEditing.bind(this)}
                    >
                        发送
                    </Button>
                </View>
            </View>
        )
        if(Platform.OS === 'ios'){
            return (
                <KeyboardAvoidingView
                    behavior="padding"
                    style={styles.KeyboardAvoidingView}
                    keyboardVerticalOffset={this.props.keyboardVerticalOffset || 64}
                >
                    {content}
                </KeyboardAvoidingView>
            )
        }else{
            return content
        }
        
	}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: Color.BackgroundGrey
    },
    KeyboardAvoidingView: {
        flex: 1
    },
    bottomToolBar: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: Color.LittleGrey
    },
    sendButton: {
        marginHorizontal: 10,
        backgroundColor: Color.WechatGreen,
        borderColor: Color.WechatGreen
    },
    sendButtonText: {
        color: Color.White
    },
    input: {
        flex: 1,
        color: Color.Black,
        fontSize: FontSize.Main,
        padding: 10
    },
    messageCell: {
        marginTop: 5,
        marginBottom: 5,
    },
    messageCellText: {
        fontSize: FontSize.Content
    },
    avatar: {
        borderRadius: 4,
        margin: 5,
        width: 40,
        height: 40
    },
    contentView: {
        borderRadius: 4,
        padding: 4,
        paddingHorizontal: 8,
        overflow: 'hidden',
        flex: 1,
        margin: 5,
        justifyContent: 'center'
    },
    endBlankBlock: {
        margin: 5,
        width: 50,
        height: 40
    }
})

export default ChatRoom