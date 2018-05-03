import { observable,action } from 'mobx'

class ProfileStore {
	@observable userInfo=null

	STORAGE_KEY_USER_INFO = 'BOSS_USER_INFO'

	// 从本地缓存恢复用户信息
    @action restoreUserInfoFromStorage=()=>{
    	const value=sessionStorage.getItem(this.STORAGE_KEY_USER_INFO)

    	this.userInfo=value?JSON.parse(value):value
    }
    //用户登入
    @action login=async ()=>{

    }
	
}

export default ProfileStore