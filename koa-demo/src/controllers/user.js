import xss from 'xss'
import mongoose from 'mongoose'
import uuid from 'uuid'

const UserModel=mongoose.model('UserModel')

//注册
export const singup=async (ctx,next)=>{
	const { body }=ctx.request
	const phoneNumber=xss(body.phoneNumber.trim())
	let user=await UserModel.findOne({
		phoneNumber:phoneNumber
	}).exec()
	const verifyCode=Math.floor(Math.random()*10000+1)

	if(!user){

		user=new UserModel({
			nickname:'',
			avatar:'',
			phoneNumber:phoneNumber,
			verifyCode:verifyCode,
			accessToken:uuid.v4(),
		})

	}else{
		//验证码
		user.verifyCode=verifyCode
	}
	
	try{
		user=await user.save()	

		ctx.body={
			success:true
		}
	}
	catch(e){
		ctx.body={
			success:false,
			err:'数据库存储出错'
		}
	}
	
	return next
	
}
//验证
export const verify=async (ctx,next)=>{
	const { body }=ctx.request
	const phoneNumber=xss(body.phoneNumber.trim())

	if(!body.phoneNumber || !body.verifyCode){
		ctx.body={
			success:false,
			err:'验证未通过',
		}
	}

	let user=await UserModel.findOne({
		phoneNumber:phoneNumber,
		verifyCode:body.verifyCode
	}).exec()

	if(user){
		user.verified=true
		user=await user.save()

		ctx.body={
			success:true,
			data:{
				avatar:user.avatar,
				nickname:user.nickname,
				accessToken:user.accessToken
			}
		}
	}else{
		ctx.body={
			success:false,
			msg:'验证未通过'
		}
	}

	return next
	
}
//更新
export const update=async (ctx,next)=>{
	const { body }=ctx.request
	let user=ctx.session.user
	const fields='avatar,gender,age,nickname,breed'.split(',')

	fields.forEach(function(field){
		if(body[field]){
			user[field]=xss(body[field])
		}
	})

	user=await user.save()

	ctx.body={
		success: true,
	    data: {
	      nickname: user.nickname,
	      avatar: user.avatar,
	      age: user.age,
	      breed: user.breed,
	      gender: user.gender,
	    }
	}

	return next
}