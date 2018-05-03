import { Alert } from 'react-native'
import Mock from 'mockjs'
import queryString from 'query-string'
import objectAssign from 'object-assign'


const ajax=async (url,opts)=>{
	
	try{
		const res=await fetch(url,opts).then((response)=>response.json())
		if(res.success){
			return res
		}else{
			Alert.alert('提示',res.msg)
			return false
		}
	}catch(e){
		Alert.alert('提示','网络不稳定或网络连接断开')
		return false
	}
}

export const post=async (url,body)=>{
	const opts={
		method:'POST',
		headers:{
			'Content-Type':'application/json'
		},
		mode:'cors',
		body:JSON.stringify(body)
	}
	return await ajax(url,opts)
}

export const put=async (url,body)=>{
	const opts={
		method:'PUT',
		headers:{
			'Content-Type':'application/json'
		},
		mode:'cors',
		body:JSON.stringify(body)
	}
	return await ajax(url,opts)
}

export const dle=async (url,body)=>{
	const opts={
		method:'DELETE',
		headers:{
			'Content-Type':'application/json'
		},
		mode:'cors',
		body:JSON.stringify(body)
	}
	return await ajax(url,opts)
}

export const get=async (url,params)=>{
	const newUrl=url+'?'+queryString.stringify(params)
	return await ajax (newUrl)
}

