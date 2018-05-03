import { observable,autorun,computed } from 'mobx'

export default Demo2=()=>{
	const value=observable(0)

	const condition=computed(()=>(value.get()>=0))

	autorun(()=>{
		console.log(`condition is：${condition.get()}`)
	})

	value.set(2)
	value.set(8)
	value.set(-3)
}