import mongoose from 'mongoose'

const Schema=mongoose.Schema
const ObjectId=Schema.Types.ObjectId

const MovieSchema=new Schema({
	title:{
		unique:true,
		type:String
	},
	category:{
		type:ObjectId,
		ref:'CategoryModel'
	}
})
const MovieModel=mongoose.model('MovieModel',MovieSchema)

export default MovieModel