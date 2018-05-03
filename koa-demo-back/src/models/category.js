import mongoose from 'mongoose'

const Schema=mongoose.Schema
const ObjectId=Schema.Types.ObjectId

const CategorySchema=new Schema({
	name:{
		unique:true,
		type:String,
	},
	movies:[{
		type:ObjectId,
		ref:'MovieModel'
	}]
})

const CategoryModel=mongoose.model('CategoryModel',CategorySchema)

export default CategoryModel