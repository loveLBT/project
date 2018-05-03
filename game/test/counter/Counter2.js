import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
} from 'react-native'

import { observable,action } from 'mobx'
import { observer } from 'mobx-react/native'

@observer
export default class Counter2 extends Component {
    @observable counter=0

    @action inc(){
        ++this.counter
    }
    @action dec(){
        --this.counter
    }
    render() {
	    return (
	        <View style={styles.container}>
		        <Text style={styles.value}>{this.counter}</Text>
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