import sha1 from 'sha1'
import getRawBody from 'raw-body'
import Wechat from './wechat'
import * as util from '../commonFunc/util'
import * as format from '../commonFunc/format'
import * as message from './message'

export const checkout=(opts)=>{
	const wechat=new Wechat(opts)
	
	return async (ctx,next)=>{
		const token=opts.token
		const signature=ctx.query.signature
		const timestamp=ctx.query.timestamp
		const nonce=ctx.query.nonce
		const echostr=ctx.query.echostr

		const str=[token,timestamp,nonce].sort().join('')
		const sha=sha1(str)

		if(sha===signature){
			/*ctx.body=echostr+''*/
			await next()
		}else{
			ctx.body='wrong'
		}
	}
}

export const handleMessage=async (ctx,next)=>{
	if(ctx.method==='POST'){
	 	const rawBodyOpts={
			length:ctx.lentgh,
			limit:'1mb',
			encoding:ctx.charset
		}

		//1.获取xml数据包内容
		const xml=await getRawBody(ctx.req,rawBodyOpts)
		//2.解析xml数据格式
		const json=await util.parseXMLAsync(xml)
		//3.解析后的json格式去数组化
		const obj=format.message(json.xml)
		console.log(obj)
		//4.设置返回内容
		const content=await message.accept(obj)
		//5.设置返回模板
		const temple=message.handleTpl(content,obj)
		console.log(temple)

		ctx.status=200
		ctx.type='application/xml'
		ctx.body=temple
		
	}
}

