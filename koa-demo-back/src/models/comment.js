import mongoose from 'mongoose'

const Schema=mongoose.Schema
const ObjectId=Schema.Types.ObjectId
const CommentSchema=new Schema({
	movieId:{
		type:ObjectId,
		ref:'MovieModel'
	},
	fromUser:{
		type:ObjectId,
		ref:'UserModel'
	},
	replys:[{
		fromUser:{type:ObjectId,ref:'UserModel'},
		toUser:{type:ObjectId,ref:'UserModel'},
		content:String
	}],	
	content:String,
})
const CommentModel=mongoose.model('CommentModel',CommentSchema)

export default CommentModel