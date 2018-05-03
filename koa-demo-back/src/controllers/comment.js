import mongoose from 'mongoose'

const CommentModel=mongoose.model('CommentModel')

export const save=async (ctx,next)=>{
	const { body }=ctx.request

	let comment=new CommentModel({
		movieId:body.movieId,
		fromUser:body.fromUser,
		toUser:body.toUser,
		content:body.content
	})

	try{
		comment=await comment.save()

		ctx.body={
			success:true,
			data:{}
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

export const update=async (ctx,next)=>{
	const { body }=ctx.request
	const id=ctx.params.id
	const reply={
			fromUser:body.fromUser,
			toUser:body.toUser,
			content:body.content
		}
	const comment=await CommentModel.findByIdAndUpdate(id,{$push:{replys:reply}}).exec()
	if(comment){
		ctx.body={
			success:true,
			data:{}
		}
	}else{
		ctx.body={
			success:false,
			err:'你要回复的评论不存在'
		}
	}

	return next
	
}