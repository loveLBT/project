import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import moment from 'moment'

const SALT_WORK_FACTOR=10
const Schema=mongoose.Schema
const UserSchema=new Schema({
	name:{
		unique:true,
		type:String,
	},
	password:{
		unique:true,
		type:String,
	},
	token:String,
	createTime:Number,
	updateTime:Number
})

UserSchema.pre('save',function(next){
	let user=this

	if(this.isNew){
		this.createTime=this.updateTime=moment(Date.now()).valueOf()
	}else{
		this.updateTime=moment(Date.now()).valueOf()
	}
	//保存前使用bcrypt进行密码加密
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		if(err) return next(err)
	
		bcrypt.hash(user.password, salt, function(err, hash) {
			if(err) return next(err)
			
			user.password=hash
			next()
		})
	})
})
//使用bcrypt的compare验证登入密码
UserSchema.methods.comparePassword=function(candidatePassword){
	let user=this
	
	return new Promise((resolve,reject)=>{
		bcrypt.compare(candidatePassword,user.password,function(err,isMatch){
			if(err){
				reject(err)
			}else{
				resolve(isMatch)
			}
		})
	})
}

const UserModel=mongoose.model('UserModel',UserSchema)

export default UserModel