import { observable,action } from 'mobx'

class SiderStore {
	@observable reverse=true
	@observable collapsed=false

	@action reverseChange=()=>{
	 	this.reverse=!this.reverse
	}
	@action collapsedChange=()=>{
		this.collapsed=!this.collapsed
	}
}

export default SiderStore