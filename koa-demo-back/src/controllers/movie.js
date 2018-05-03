import mongoose from 'mongoose'

const MovieModel=mongoose.model('MovieModel')
const CommentModel=mongoose.model('CommentModel')
const CategoryModel=mongoose.model('CategoryModel')

export const save=async (ctx,next)=>{
	const { body }=ctx.request
	let movie=new MovieModel({
		title:body.title,
		category:body.category
	})

	try{
		const doc=await movie.save()
		await CategoryModel.findByIdAndUpdate(body.category,{$push:{movies:doc._id}})
		
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
	const { category,size,page }=ctx.query
	let movies=[]

	if(category){
		movies=await CategoryModel.findById(category).populate({path:'movies',select:'title -_id',options:{limit:2,skip:2}}).exec()
	}else{
		movies=await MovieModel.find({},'-_id').populate('category','name -_id').exec()
	}

	ctx.body={
		success:true,
		data:{
			movies:movies
		}
	}
}

export const detail=async (ctx,next)=>{
	let id=ctx.params.id
	let movie=await MovieModel.findById(id).exec()
	if(movie){
		let comments=await CommentModel.find({movieId:id})
										.populate('fromUser','name -_id')
										.populate('replys.fromUser replys.toUser','name -_id')
										.exec() || []
		ctx.body={
			success:true,
			data:{
				title:movie.title,
				comments:comments
			}
			
		}
	}else{
		ctx.body={
			success:false,
			err:'电影不存在'
		}

		return next
	}

	return next
}