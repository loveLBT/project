import React,{ Component } from 'react'
import { View,StyleSheet,Text,ListView } from 'react-native'
import { observable, action, computed } from 'mobx'
import { observer } from 'mobx-react/native'

class CartItem {
	name=''
	price=0

	@observable count=0

	constructor(name,price) {
		this.name=name
		this.price=price
	}

	@action inc=()=>{
		++this.count
	}
	@action dec=()=>{
		if(this.count>0){
			--this.count
		}
	}
}

class Cart {
	@observable items=[]

	constructor() {
		this.addItem()
	}

	@action addItem=()=>{
		for(let i=0;i<10;i++){
			this.items.push(new CartItem(
				`商品${i}`,
				Math.floor(Math.random()*100000)/100
			))
		}
	}

	@computed get count(){
		return this.items.reduce((a,b)=>a+b.count,0)
	}
	@computed get price(){
		return this.items.reduce((a,b)=>a+(b.count*b.price),0)
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
		        <Text>{data.count}</Text>
		        <Text style={styles.btn} onPress={data.inc}>+</Text>
		        <Text style={styles.btn} onPress={data.dec}>-</Text>
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
			    Count: {`${cart.count}`} {'\n'}
			    Price: {cart.price.toFixed(2)} {'\n'}
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