import { observable,action,computed,toJS } from 'mobx'
import { Platform,AppState,AsyncStorage } from 'react-native'
import io from 'socket.io-client'
import _ from 'lodash'

import config from '../config'

const messageData=[
	{ext:{avatar:'http://image-2.plusman.cn/app/im-client/avatar/tuzki_14.png'},from:507,msg:{content:'hi'}},
	{ext:{avatar:'http://image-2.plusman.cn/app/im-client/avatar/tuzki_14.png'},from:508,msg:{content:'hi'}},
	{ext:{avatar:'http://image-2.plusman.cn/app/im-client/avatar/tuzki_14.png'},from:509,msg:{content:'hi'}},
	{ext:{avatar:'http://image-2.plusman.cn/app/im-client/avatar/tuzki_14.png'},from:509,msg:{content:'hi'}},
	{ext:{avatar:'http://image-2.plusman.cn/app/im-client/avatar/tuzki_14.png'},from:509,msg:{content:'hi'}},
	{ext:{avatar:'http://image-2.plusman.cn/app/im-client/avatar/tuzki_14.png'},from:509,msg:{content:'hi'}},
	{ext:{avatar:'http://image-2.plusman.cn/app/im-client/avatar/tuzki_14.png'},from:509,msg:{content:'hi'}},
	{ext:{avatar:'http://image-2.plusman.cn/app/im-client/avatar/tuzki_14.png'},from:509,msg:{content:'hi'}},
	{ext:{avatar:'http://image-2.plusman.cn/app/im-client/avatar/tuzki_14.png'},from:509,msg:{content:'hi'}},
	{ext:{avatar:'http://image-2.plusman.cn/app/im-client/avatar/tuzki_14.png'},from:509,msg:{content:'hi'}},
	{ext:{avatar:'http://image-2.plusman.cn/app/im-client/avatar/tuzki_14.png'},from:509,msg:{content:'hi'}},
	{ext:{avatar:'http://image-2.plusman.cn/app/im-client/avatar/tuzki_14.png'},from:509,msg:{content:'hi'}},
	{ext:{avatar:'http://image-2.plusman.cn/app/im-client/avatar/tuzki_14.png'},from:509,msg:{content:'hi'}},
	{ext:{avatar:'http://image-2.plusman.cn/app/im-client/avatar/tuzki_14.png'},from:509,msg:{content:'hi'}},
	{ext:{avatar:'http://image-2.plusman.cn/app/im-client/avatar/tuzki_14.png'},from:509,msg:{content:'hi'}},
	{ext:{avatar:'http://image-2.plusman.cn/app/im-client/avatar/tuzki_14.png'},from:509,msg:{content:'hi'}},
	{ext:{avatar:'http://image-2.plusman.cn/app/im-client/avatar/tuzki_14.png'},from:509,msg:{content:'hi'}},
]

class SocketStore {
	@observable socketId=null
	@observable currentChatKey=null
	@observable currentChatRoomHistory=[]
	sessionListMap = observable.map()

	constructor() {	
		// App 状态监控
		/*AppState.addEventListener('change',this.handleAppStateChange)*/

		// 强制指定使用 websocket 作为传输通道
        /*this.socket = io(config.ws, {
            transports: ['websocket']
        })*/
	}
		
	@computed get sessionList(){
		 return [...this.sessionListMap.values()].sort(function(a, b) {
            return b.timestamp - a.timestamp
        }).map(function (item) {
            item.latestTime = moment(item.timestamp).startOf('minute').fromNow();
            return item
        })
	}

	@action handleAppStateChange=(appState)=>{
		if(Platform.OS==='ios' && appState==='inactive'){
			this.socket.close()

		}

		if(Platform.OS==='android' && appState==='background'){
			this.socket.close()
		}

		if(appState==='active'){
			this.socket.open()
		}
	}

	// 当前聊天室相关方法
	@action fillCurrentChatRoomHistory=async (page=0,size=12)=>{
		if(this.currentChatKey){
			let results
			
			if(typeof page==='number' && page===0){
				// 异步更新
				results=await this.restoreMessageFromLocalStore(this.currentChatKey,page,size)
				this.currentChatRoomHistory=results
			}else{
				console.log('fillCurrentChatRoomHistory')
			}

			return results.length

		}

		return 0
	}

	// 本地消息入口，本地 payload 推入，只有单条推入
	@action pushLocalePayload=(payload)=>{
		let sessionItem=this.formatPayloadToSessionItem(payload)
	}
	 /**
     * 历史消息存储结构
     * message:history:${key} 存储用户的消息 id 集合
     * message:item:${uuid} 消息 uuid 集合
     */
     @action saveMessageToLocalStore=async (key)=>{

     }
	 /**
     * 从历史恢复消息
     * 每次取的数目还不能超过 13 条，不然由于 listView 懒加载，无法滚动到底部
     */
	@action restoreMessageFromLocalStore=async (key,page,size)=>{
		let history=await AsyncStorage.getItem(`message:history:${key}`)

		if(history){
			console.log('restoreMessageFromLocalStore')
		}else{
			return []
		}
	}

	formatPayloadToSessionItem(payload){
		let sessionItem
		let key=this.getPayloadKey(payload)
		let toInfo=payload.localeExt.toInfo

		sessionItem={
			avatar: toInfo.avatar,
            name: toInfo.name,
            latestMessage: payload.msg.content,
            unReadMessageCount: 0,
            timestamp: +(new Date()),
            key: key,
            toInfo: toInfo
		}
	}
	getPayloadKey(payload){
		return `${payload.from}-${payload.to}`
	}

	clear=async ()=>{
		await AsyncStorage.clear()
		this.sessionListMap.clear()
	}
}

export default SocketStore