import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    TextInput
} from 'react-native'

import { observable,action } from 'mobx'
import { observer } from 'mobx-react/native'

@observer
export default class Counter3 extends Component {
    @observable counter=0

    @action inc(){
        ++this.counter
    }
    @action dec(){
        --this.counter
    }
    @action handleChangeText(value){
        this.counter=parseInt(value)
    }
    render() {
	    return (
	        <View style={styles.container}>
		        <TextInput style={styles.value} value={`${this.counter}`} onChangeText={this.handleChangeText.bind(this)} />
		        <Text style={styles.btn} onPress={this.inc.bind(this)}>+</Text>
		        <Text style={styles.btn} onPress={this.dec.bind(this)}>-</Text>
	        </View>
	    )
    }
}

const styles = StyleSheet.create({
 	container: {
	    flexDirection: 'row',
	    justifyContent: 'center',
	    alignItems: 'center',
	    backgroundColor: 'white',
    },
    value: {
    	paddingHorizontal: 20,
   		paddingVertical: 8,
  	},
    btn: {
    	padding: 8,
    	borderWidth: 1,
    },
});