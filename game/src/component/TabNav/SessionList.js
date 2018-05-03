import React,{ Component } from 'react'
import { observer } from 'mobx-react/native'
import {
    TouchableHighlight,
    StyleSheet,
    Image,
    ListView,
    Text,
    View
} from 'react-native'
import {
    FontSize,
    Swipeout,
    Color,
    Badge,
    ListItem
} from '../../../UiLibrary'
import { socketStore } from '../../storeSingleton'

class ConversationCell extends Component {
    render(){
        let { avatar,unReadMessageCount,name,latestTime,latestMessage,onPress }=this.props
        return (
            <TouchableHighlight
                onPress={onPress}
            >
                <View style={styles.ConversationCell}>

                    <View style={styles.leftBox}>
                        <Image 
                            source={{
                                uri:avatar
                            }}
                            style={styles.avatar}
                        />
                        <Badge 
                            style={styles.cellBadge}
                            unReadMessageCount={unReadMessageCount}
                            height={18}
                        />
                    </View>

                    <View
                        style={styles.rightBox}
                    >
                        <View style={styles.cellBox}>
                            <Text 
                                style={styles.sessionName} 
                                numberOfLines={1}
                            >
                                {name}
                            </Text>
                            <Text
                                style={styles.latestTime}
                            >
                                {latestTime}
                            </Text>
                        </View>
                        <Text 
                            style={styles.boxFloor}
                            numberOfLines={1}
                        >
                            {latestMessage}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}

@observer
class SessionList extends Component {
	ds=new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!=r2}) 
	
	renderRow(row){
		return (
			<Swipeout 
				key={row.key} 
				rightButton={[
					{title:'删除',type:'Delete',onPress:()=>{console.log(row)}}
				]}
			>
				<ConversationCell 
					avatar={row.avatar}
					unReadMessageCount={row.unReadMessageCount}
					name={row.name}
					latestTime={row.latestTime}
					latestMessage={row.latestMessage}
					onPress={()=>{console.log(row.Info)}}
				/>
			</Swipeout>
		)
	}
	render(){
		if(socketStore.sessionList.length){
            return (
                <View style={styles.container}>
                    <ListView 
                        dataSource={this.ds.cloneWithRows(socketStore.sessionList)}
                        enableEmptySections={true}
                        renderRow={this.renderRow.bind(this)}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            )
        }else{
            return (
                <View style={styles.emptyMessage}>
                    <Image
                        source={{
                            uri: 'http://image-2.plusman.cn/app/im-client/empty-message.png'
                        }}
                        style={styles.emptyMessageImage}
                    />
                    <Text
                        style={styles.emptyMessageText}
                    >
                        暂无消息
                    </Text>
                </View>
            )
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
    ConversationCell: {
        flexDirection: 'row',
        backgroundColor: Color.White
    },
    leftBox: {
        padding: 6
    },
    avatar: {
        borderRadius: 4,
        width: 50,
        height: 50
    },
    cellBadge: {
        position: 'absolute',
        top: 2,
        right: 0
    },
    rightBox: {
        flex: 1,
        padding: 10
    },
    cellBox: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    sessionName: {
        fontSize: FontSize.Content,
        color: Color.Black
    },
    boxFloor: {
        fontSize: FontSize.Annotation,
        color: '#9A9A9A'
    },
    latestTime: {
        fontSize: FontSize.Annotation,
        color: '#B3B3B3'
    },
    emptyMessage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyMessageImage: {
        width: 90,
        height: 90,
        opacity: 0.6
    },
    emptyMessageText: {
        color: Color.LightBlack,
        fontSize: FontSize.Annotation
    }
})

export default SessionList