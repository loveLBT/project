import mongoose from 'mongoose'

const UserModel=mongoose.model('UserModel')

export const hasBody=async (ctx,next)=>{
	const { body }=ctx.request

	if(Object.keys(body).length===0){
		ctx.body={
			success:false,
			err:'缺少参数'
		}

		return next
	}

	await next()
}

export const hasToken=async (ctx,next)=>{
	let token=ctx.query.token

	if(!token){
		token=ctx.request.body.token
	}

	if(!token){
		ctx.body={
			success:false,
			err:'没有权限'
		}

		return next
	}

	let user=await UserModel.findOne({token:token}).exec()

	if(!user){
		ctx.body={
			success:false,
			err:'没有权限'
		}
	}

	ctx.session=ctx.session || {}
	ctx.session.user=user
	
	await next()
}