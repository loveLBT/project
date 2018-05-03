import tpl from './tpl'
/*import Wechat from './wechat'*/
import config from '../constants/config'

/*const wechat=new Wechat(config.wechat)*/

export const accept=(message)=>{
	let content=''
	return new Promise(async (resolve,reject)=>{
		if(message.MsgType==='event'){
			if(message.Event==='subscribe'){
				if(message.EventKey){
					console.log('扫描二维码进来的'+message.EventKey)
				}
				content='欢迎使用'
			}
			else if(message.Event==='unsubscribe'){
				console.log('被用户取关')
				content=''
			}
			else if(message.Event==='LOCATION'){
				content='您上报的位置是：'+message.Latitude+'/'+message.Longitude+'-'+message.Percision
			}
			else if(message.Event==='CLICK'){
				content='你点击了菜单'+message.EventKey
			}
			else if(message.Event==='SCAN'){
				console.log('关注后扫二维码'+message.EventKey+' '+message.Ticket)
				content='看到你扫了一下'
			}
			else if(message.Event==='VIEW'){
				content='你点击了菜单中的链接'+message.EventKey
			}
		}
		else if(message.MsgType==='text'){
			const text=message.Content
			let reply='别说这个'+text+'，我不知道'
			if(text==='1'){
				reply='1根'
			}
			else if(text==='2'){
				reply='2根'
			}
			else if(text==='3'){
				reply='3根'
			}
			else if(text==='4'){
				reply=[
					{title:'Hello Word',description:'你好！世界',picUrl:'http://img3.imgtn.bdimg.com/it/u=3193006289,3802606706&fm=23&gp=0.jpg',url:'https://github.com'},
					
				]
			}/*else if(text==='5'){
				const data=await wechat.uploadMedia('image','1.jpg')
				reply={
					type:'image',
					mediaId:data.media_id
				}
			}*/
			content=reply
		}
		resolve(content)
	})
}

export const handleTpl=(content,message)=>{
	let info={}
	let type='text'

	if(Array.isArray(content)){
		type='news'
	}
	type=content.type || type

	info.content=content
	info.createTime=new Date().getTime()
	info.msgType=type
	info.toUserName=message.FromUserName
	info.fromUserName=message.ToUserName

	return tpl.compiled(info)
}