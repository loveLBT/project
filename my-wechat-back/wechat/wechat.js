import rp from 'request-promise'
import fs from 'fs'
import * as util from '../commonFunc/util'

const Wechat=function(opts){
	this.appId=opts.appId
	this.appSecret=opts.appSecret
	this.accessFile=opts.accessFile
	this.prefix=opts.prefix
	this.accessTokenUrl=this.prefix+opts.api.accessToken
	this.uploadMediaUrl=this.prefix+opts.api.uploadMedia

	this.getAccessToken()
}
Wechat.prototype.getAccessToken=async function(){
	try{
		const data=JSON.parse(await util.readFileAsync(this.accessFile))
		if(!this.isValidAccessToken(data)){
			this.updateAccessToken()
		}
	}catch(err){
		this.updateAccessToken()
	}
}
Wechat.prototype.isValidAccessToken=function(data){
	if(!data || !data.access_token || !data.expires_in){
		return false
	}
	const expires_in=data.expires_in
	const now=(new Date()).getTime()

	if(now<expires_in){
		return true
	}else{
		return false
	}
}
Wechat.prototype.updateAccessToken=async function(){
	const url=this.accessTokenUrl+'&appid='+this.appId+'&secret='+this.appSecret

	const res=await rp(url)
	const data=JSON.parse(res)
	const now=(new Date().getTime())
	const expires_in=now+(data.expires_in-20)*1000

	data.expires_in=expires_in

	await util.writeFileAsync(this.accessFile,JSON.stringify(data))
}
Wechat.prototype.uploadMedia=function(type,filepath){
	const form={
		media:fs.createReadStream(filepath)
	}
	return new Promise(async (resolve,reject)=>{
		const obj=JSON.parse(await util.readFileAsync(this.accessFile))
		const url=this.uploadMediaUrl+'access_token='+obj.access_token+'&type='+type
		const res=await rp({method:'POST',url,formData:form})
		const data=JSON.parse(res)
		resolve(data)
	})
}
export default Wechat