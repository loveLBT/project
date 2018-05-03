export const message=(result)=>{
	const message={}
	if(typeof result==='object'){
		for (let item in result){
			const val=result[item]
			const key=item
			if(!(val instanceof Array) || val.length===0){
				continue
			}
			if(val.length===1){
				const value=val[0]
				if(typeof value==='object'){
					message[key]=formatMessage(value)
				}else{
					message[key]=(value || '').trim()
				}
			}else{
				message[key]=[]
				for(let list of val){
					message[key].push(formatMessage(list))
				}
			}
		}
	}
	return message
}
