import { observable,action,runInAction } from 'mobx'
import axios from 'axios'
import md5 from 'md5'

class ProfileStore {
    @observable isLogin=false
    @observable asyncLoading=false
	@observable userInfo={}
    @observable userMenus=[]
    @observable systemInfo={bgName:'bg5.jpg'}


    STORAGE_KEY_USER_INFO = 'FRONT_USER_INFO'
	STORAGE_KEY_SYSTEM_INFO = 'FRONT_SYSTEM_INFO'

    constructor(){
        this.restoreSystemInfoFromStorage()
        this.restoreUserInfoFromStorage()
    }

	// 从本地缓存恢复用户信息
    @action restoreUserInfoFromStorage=()=>{
    	const value=sessionStorage.getItem(this.STORAGE_KEY_USER_INFO)

        if(value){
            this.isLogin=true
            this.userInfo=JSON.parse(value)
        }
    	
    }
    // 从本地缓存恢复系统信息
    @action restoreSystemInfoFromStorage=()=>{
        const value=localStorage.getItem(this.STORAGE_KEY_SYSTEM_INFO)
        if(value){
            this.systemInfo=JSON.parse(value)
        }
    }
    //  缓存户登录成功后的信息
    @action setUserInfoStorage=async ()=>{
        const res=await axios.get('/search/record')
        
        if(res.code===200){
            runInAction(()=>{
                const data={userName:res.userName}
                this.userInfo=data
                sessionStorage.setItem(this.STORAGE_KEY_USER_INFO,JSON.stringify(data))
            })
        }
        return res
    }
    //更新系统信息缓存
    @action setSystemInfoStorage=(data)=>{
        const value=localStorage.getItem(this.STORAGE_KEY_SYSTEM_INFO)
        let newData={}
        
        if(value){
            const jsValue=JSON.parse(value)
            newData={...jsValue,...data}
        }else{
            newData=data
        }
        this.systemInfo=newData
        localStorage.setItem(this.STORAGE_KEY_SYSTEM_INFO,JSON.stringify(newData))
    }
    //  用户登入
    @action login=async (phone,password)=>{
        const res1=await axios.post('/salt',{phone})
        if(res1.code===200){
            const newPassword=md5(password+res1.salt)
            const res2=await axios.post('/session',{phone,password:newPassword})
            if(res2.code===200){
                runInAction(()=>{
                    this.isLogin=true
                })
            }
            return res2
        }else{
            return res1
        }
    }
    // 用户登出
    @action logout=()=>{
        this.isLogin=false
        this.userInfo={}
        this.userMenus=[]
        sessionStorage.removeItem(this.STORAGE_KEY_USER_INFO)
    }
    //获取用户菜单
	@action loadUserMenus=async ()=>{
        const res=await axios.get('/menu/home_pc')

        if(res.code===200){
            runInAction(()=>{
                this.userMenus=res.menus
            })
        }
        return res
    }
}

export default ProfileStore