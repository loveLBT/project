import { observable,autorun,action,computed } from 'mobx'

class Foo {
	@observable selected=0
	@observable items=[0,1,2]

	@computed get selectedItem(){
		if(this.selected>=this.items.length){
			return 
		}
		return this.items[this.selected]
	}


	@action addItem(item){
		this.items.push(item)
	}
	@action removeItem(id){
		this.items.splice(id,1)
		if(this.selected>=id){
			this.selected--
		}
	}

	@action removeSelected(){
		this.items.splice(this.selected,1)
	}
}

export default Demo5=()=>{
	const foo=new Foo()
	
	autorun(()=>{
		console.log(`Current selected is：${foo.selected}`)
	})
	autorun(()=>{
		console.log(`items is：${foo.items}`)
	})
	autorun(()=>{
		console.log(`selected item is：${foo.items[foo.selected]}`)
	})

	foo.addItem(3)
	foo.addItem(4)
	foo.addItem(5)

	foo.selected=2
	foo.removeItem(1)
}