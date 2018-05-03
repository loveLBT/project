import fs from 'fs'
import xml2js from 'xml2js'

export const readFileAsync=(fpath)=>{
	return new Promise((resolve,reject)=>{
		fs.readFile(fpath,(err,content)=>{
			if(err) reject(err)
			else resolve(content)
		})
	})
}

export const writeFileAsync=(fpath,content)=>{
	return new Promise((resolve,reject)=>{
		fs.writeFile(fpath,content,(err)=>{
			if(err) reject(err)
			else resolve(content)
		})
	})
}

export const parseXMLAsync=(data)=>{
	return new Promise((resolve,reject)=>{
		xml2js.parseString(data,{trim:true},(err,content)=>{
			if(err) reject(err)
			else resolve(content)
		})
	})
}
