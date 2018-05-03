import fs from 'fs'

//加载目录下的所有.js文件函数
export const walk=(path)=>{
	fs
	  .readdirSync(path)
	  .forEach((file)=>{
	  	var filePath=path+'/'+file
	  	var stat=fs.statSync(filePath)
	  	//判断是否为文件
	  	if(stat.isFile()){
	  		if(/(.*)\.(js)/.test(file)){
	  			require(filePath)
	  		}
	  	}
	  	//判断是否为目录
	  	if(stat.isDirectory()){
	  		walk(filePath)
	  	}
	  	
	  })
}