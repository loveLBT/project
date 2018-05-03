import axios from 'axios'
import { message } from 'antd'
import { profileStore } from '../store'

//	拦截异步请求
axios.interceptors.request.use((config)=>{
	profileStore.asyncLoading=true

	return config
})

//拦截异步响应
axios.interceptors.response.use((response)=>{
	profileStore.asyncLoading=false

	if(response.data.code!==200 && response.data.msg){
		message.error(response.data.msg)
	}

	return response.data
},(error)=>{
	profileStore.asyncLoading=false
	
	if(error && error.response){
		MessageError(error)
	}

	return Promise.reject(error)
})

//请求错误提示
const MessageError=(error)=>{
	let msg='未知错误'

	switch(error.response.status) {
		case 400:
			msg='请求参数错误'
			break
		case 401:
			msg='没有权限'
			break
		case 404:
			msg=`请求的地址: ${error.response.request.responseURL}没有找到`
			break
		case 500:
			msg='与服务器连接断开'
			break
		default:
	}

	message.error(msg)
}