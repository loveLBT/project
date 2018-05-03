import { AsyncStorage,Vibration } from 'react-native'
import { observable,action,runInAction } from 'mobx'
import config from '../config'
import * as Ajax from '../commonFunc/Ajax'

class ProfileStore {
	@observable userInfo=null
	@observable friendList={}
	@observable isTryRestoreFromStorage=false

	STORAGE_KEY_USER_INFO = 'GAME_USER_INFO'
    STORAGE_KEY_FRIEND_LIST = 'GAME_FRIEND_LIST'

    constructor(socket) {
         //  绑定 socket 对象
         this.socket=socket
        // 恢复用户信息
        this.restoreUserInfoFromStorage()
        // 拉取好友
        this.getOnlineList()
    }

    // 从本地缓存恢复用户信息
    @action restoreUserInfoFromStorage=async ()=>{
    	let value=await AsyncStorage.getItem(this.STORAGE_KEY_USER_INFO)

    	runInAction(()=>{
    		this.userInfo=value?JSON.parse(value):value

    		// 执行完毕
        	this.isTryRestoreFromStorage = true;
    	})
    	
    }
    // 更新用户信息
    @action updateUserInfo=async (field,value)=>{
    	let url = config.api + `/v1/user/${this.userInfo.userId}/property/${field}`;
        let body = { value }
        let res = await Ajax.put(url,body)

        if(res){
            runInAction(()=>{
                this.userInfo=res.data
                AsyncStorage.setItem(this.STORAGE_KEY_USER_INFO,JSON.stringify(res.data))
            })
        }

        return res
    }
    // 用户登录
   @action login=async (body)=>{
        let url=config.api+'/v1/user'
        let res=await Ajax.post(url,body)

        if(res){
            runInAction(()=>{
                this.userInfo=res.data
                AsyncStorage.setItem(this.STORAGE_KEY_USER_INFO,JSON.stringify(this.userInfo))
            })
        }

        return res
    }
    // 用户登出
    @action logout=async (userId)=>{
        let url=config.api + `/v1/user/${userId}/status`
        let res=await Ajax.dle(url)

        if(res){
            runInAction(async ()=>{
                // 清除用户的信息
                await this.socket.clear()
                this.userInfo=null
            })
        }

        return res
    }
    // 拉取在线用户列表
    @action getOnlineList=async ()=>{
        let url=config.api + '/v1/user/online/list'
        let res =await Ajax.get(url)

        if(res){
            runInAction(()=>{
                this.friendList=res.data
                AsyncStorage.setItem(this.STORAGE_KEY_FRIEND_LIST, JSON.stringify(res.data))
            })
        }

        return res
    }

}

export default ProfileStore