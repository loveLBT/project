import React,{ Component } from 'react'
import { View,StyleSheet,Text,ListView } from 'react-native'
import { observable, action, computed } from 'mobx'
import { observer } from 'mobx-react/native'

class CartItem {
	name=''
	price=0
	cart=null

	constructor(name,price,cart) {
		this.name=name
		this.price=price
		this.cart=cart
	}

	@computed get selected(){
		return this.cart.selectedItem===this
	}

	@action select=()=>{
		this.cart.selectedItem=this
	}
}

class Cart {
	@observable items=[]
	@observable selectedItem=null

	constructor() {
		this.addItem()
	}

	@action addItem=()=>{
		for(let i=0;i<10;i++){
			this.items.push(new CartItem(
				`商品${i}`,
				Math.floor(Math.random()*100000)/100,
				this
			))
		}
	}

}

@observer
class Item extends Component {
	render(){
		const {data}=this.props
		return (
			<View style={styles.item}>
		        <Text>{data.name}</Text>
		        <Text style={styles.price}>${data.price}</Text>
		        <Text>{data.selected?'Selected':'-'}</Text>
		        <Text style={styles.btn} onPress={data.select}>Choose</Text>
	        </View>
		)
	}
}

@observer
class Info extends Component {
	render(){
		const {cart}=this.props
		return (
			<Text>
			    selectedItem: {cart.selectedItem && cart.selectedItem.name}
		    </Text>
		)
	}
}

class Demo extends Component {
	ds=new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!=r2}) 
	cart=new Cart()

	renderRow(row){
		return (
			<Item data={row} />
		)
	}
	render(){
		return (
			<View style={styles.container}>
				<ListView 
					enableEmptySections={true}
					dataSource={this.ds.cloneWithRows(this.cart.items.slice(0))}
					renderRow={this.renderRow.bind(this)}
				/>

				<Info cart={this.cart} />
			</View>
		)
	}
}


const styles = StyleSheet.create({
 	container: {
	    flex: 1,
	    backgroundColor: 'white',
  	},
  	item: {
	    flexDirection: 'row',
	    padding: 10,
	    alignItems: 'center',
  	},
  	price: {
	    marginLeft: 10,
	    flex: 1,
  	},
 	btn: {
	    padding: 8,
	    borderWidth: 1,
 	},
})

export default Demo