/*
**用于封装controllers的公共方法
*/
import mongoose from 'mongoose'

const UserModel=mongoose.model('UserModel')

//判断post请求是否携带参数
export const hasBody=async (ctx,next)=>{
	const body=ctx.request.body || {}

	if(Object.keys(body).length===0){
		ctx.body={
			success:false,
			err:'缺少参数'
		}

		return next
	}

	await next()
}

//判断是否含有token的中间件
export const hasToken=async (ctx,next)=>{
	let accessToken=ctx.query.accessToken

	if(!accessToken){
		accessToken=ctx.request.body.accessToken
	}

	if(!accessToken){
		ctx.body={
			success:false,
			err:'无法验证用户信息'
		}

		return next
	}

	const user=await UserModel.findOne({
		accessToken:accessToken
	}).exec()

	if(!user){
		ctx.body={
			success:false,
			err:'用户未登入'
		}

		return next
	}

	ctx.session=ctx.session || {}
	ctx.session.user=user

	await next()
}