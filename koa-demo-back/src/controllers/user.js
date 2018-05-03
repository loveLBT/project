import mongoose from 'mongoose'
import uuid from 'uuid'

const UserModel=mongoose.model('UserModel')

export const signup=async (ctx,next)=>{
	const { body }=ctx.request
	let user=await UserModel.findOne({
		name:body.name
	}).exec()

	if(!user){
		user=new UserModel({
			name:body.name,
			password:body.password,
			token:uuid.v4()
		})
	}else{
		ctx.body={
			success:false,
			err:'该用户名已被注册'
		}

		return next
	}

	try{
		user=await user.save()
		
		ctx.body={
			success:true,
			data:{
				name:body.name,
				token:user.token
			}
		}
	}catch(e){
		ctx.body={
			success:false,
			err:'服务器出错'
		}

		console.log('数据库存储出错：'+e)

		return next
	}

	return next

}
export const signin=async (ctx,next)=>{
	const { body }=ctx.request

	let user=await UserModel.findOne({
		name:body.name
	}).exec()

	if(!user){
		ctx.body={
			success:false,
			err:'用户名或密码错误'
		}

		return next
	}else{
		try{
			const isMatch=await user.comparePassword(body.password)
			if(isMatch){
				ctx.body={
					success:true,
					data:{
						name:user.name,
						token:user.token
					}
				}
			}else{
				ctx.body={
					success:false,
					err:'用户名或者密码出错'
				}
			}
		}catch(e){
			console.log(e)

			return next
		}
	}

	return next
}
export const list=async (ctx,next)=>{
	let users=await UserModel.find({}).sort('-meta.createAt').exec()
	
	ctx.body={
		success:true,
		data:{
			total:users.length,
			list:users
		}
	}
}