import axios from 'axios'
import { message } from 'antd'
import { profileStore } from '../store'

axios.defaults.withCredentials = true;
//	拦截异步请求
axios.interceptors.request.use((config)=>{
	profileStore.asyncLoading=true
	return config
},(error)=>{
	return Promise.reject(error)
})

const downloadPost = (config) => {
  const url = config.url
  const data = JSON.parse(config.data)
  const form = document.createElement('form')
  form.action = url
  form.method = 'post'
	form.style.display = 'none';
	console.log(data);
	if(data){
		Object.keys(data).forEach(key => {
			const input = document.createElement('input')
			input.name = key
			input.value = data[key]
			form.appendChild(input)
		})
	}
  const button = document.createElement('input')
  button.type = 'submit'
  form.appendChild(button)
  document.body.appendChild(form)
  form.submit()
  document.body.removeChild(form)
}

const downloadGet = (config) => {
  const params = []
  for (const item in config.params) {
    params.push(`${item}=${config.params[item]}`)
  }
  const url = params.length ? `${config.url}?${params.join('&')}` : `${config.url}`
  let iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  iframe.src = url
  iframe.onload = function () {
    document.body.removeChild(iframe)
  }
  document.body.appendChild(iframe)
}

//拦截异步响应
axios.interceptors.response.use((res)=>{
	profileStore.asyncLoading=false

	// 处理流
	if(res.headers){
		let type = res.headers['content-type'];
		if ( type === 'application/octet-stream' || type === 'application/x-excel') {
			const config = res.config
			if (config.method === 'post') {
				downloadPost(config)
			} else if (config.method === 'get') {
				downloadGet(config)
			}
			return;
		}
  }
	if((res.data.code < 200 || res.data.code > 300) && res.data.msg){
		message.error(res.data.msg)
		// throw SyntaxError();
		return Promise.reject(res.data.msg)
	}

	return res.data
},(error)=>{
	profileStore.asyncLoading=false
	
	if(error && error.response){
		MessageError(error);
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