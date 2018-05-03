import { observable,autorun,computed } from 'mobx'

export default Demo4=()=>{
	const value=observable([0])

	autorun(()=>{
		console.log(`value.length is：${value.length}`)
	})

	const first=computed(()=>value[0])

	autorun(()=>{
		/*console.log(`value[0] is：${value[0]}`)*/
		console.log(`value[0] is：${first}`)
	})

	value[0]=1
	value.push(2)
	value.push(3)
	value.push(4)
	value.splice(0,1)
}