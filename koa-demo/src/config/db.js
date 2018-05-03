import mongoose from 'mongoose'
import bluebird from 'bluebird'

import config from './config'
import * as func from './func'

mongoose.Promise=bluebird
mongoose.connect(config.DB_URL)
//数据库连接成功
mongoose.connection.once('open', function () {    
   console.log('Mongoose connection success')
})
//数据库连接失败
mongoose.connection.on('error',function (err) {    
    console.log('Mongoose connection error: ' + err);  
})
//加载models文件下所有的.js后缀的文件
func.walk(config.models_path)