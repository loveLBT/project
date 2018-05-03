import mongoose from 'mongoose'

const CategoryModel=mongoose.model('CategoryModel')

export const save=async (ctx,next)=>{
	const { body }=ctx.request
	const category=new CategoryModel({
		name:body.name
	})

	try{
		await category.save()
		ctx.body={
			success:true,
			data:{}
		}
	}catch(e){
		ctx.body={
			success:false,
			err:'服务器出错'
		}

		return next
	}

	return next
}

export const list=async (ctx,next)=>{
	const categorys=await CategoryModel.find({},'name').exec()

	ctx.body={
		success:true,
		data:{
			categorys:categorys
		}
	}
}