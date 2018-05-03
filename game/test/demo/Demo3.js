import { observable,autorun } from 'mobx'

export default Demo3=()=>{
	const value=observable({
		foo:0,
		bar:0,
		get condition(){
			return this.foo>=0
		}
	})

	autorun(()=>{
		console.log(`value.foo is ：${value.foo}`)
	})

	autorun(()=>{
		console.log(`value.condition is ：${value.condition}`)
	})

	autorun(()=>{
		console.log(`value.bar is：${value.bar}`)
	})
	/*value.foo=2
	value.foo=8
	value.foo=-3*/

	value.bar=1
	value.bar=2
}