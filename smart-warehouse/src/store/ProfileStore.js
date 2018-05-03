import { observable,action,runInAction } from 'mobx'
import API from '../api/api'
import _ from 'lodash'

import config from '../config/config'

class ProfileStore {
	@observable asyncLoading=false
	@observable userInfo={}
	@observable systemInfo={
		account:'',
		password:''
	}
	@observable moduleMenus=[]
	@observable userMenus=[]

	STORAGE_KEY_USER_INFO = 'FRONT_USER_INFO'
	STORAGE_KEY_SYSTEM_INFO = 'FRONT_SYSTEM_INFO'

	constructor() {
	  	this.restoreUserInfoFromStorage()
	  	this.restorageSystemInfoFromStorage()
	}
	
	@action restoreUserInfoFromStorage=()=>{
		const value=sessionStorage.getItem(this.STORAGE_KEY_USER_INFO)
		if(value){
			this.isLogin=true
			this.userInfo=JSON.parse(value)
		}
	}

	@action restorageSystemInfoFromStorage=()=>{
		const value=localStorage.getItem(this.STORAGE_KEY_SYSTEM_INFO)
        if(value){
            this.systemInfo=JSON.parse(value)
        }
	}

	@action setUserInfoStorage=(data)=>{
		this.userInfo=data
		sessionStorage.setItem(this.STORAGE_KEY_USER_INFO,JSON.stringify(data))
	}

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

	@action login=async (values)=>{
		const data={account:values.account,password:values.password}
		const res = await API.login(data);
		
		if(res.code===200){
			runInAction(()=>{
				this.setUserInfoStorage(res.content)
				
				if(values.remember){
					this.setSystemInfoStorage(data)
				}else{
					this.setSystemInfoStorage({account:'',password:''})
				}
			})
		}

	}

	@action loadUserMenus=()=>{
		this.userMenus=config.userMenus

		this.moduleMenus=_.map(config.userMenus,(menu)=>_.omit(menu,'childrenMenus'))
	}
}

export default ProfileStore