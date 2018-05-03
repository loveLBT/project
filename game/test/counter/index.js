import React, { Component } from 'react'
import { StyleSheet,View,Text } from 'react-native'

import Counter1 from './Counter1'
import Counter2 from './Counter2'
import Counter3 from './Counter3'

export default class CounterList extends Component{
	render(){
		return (
			<View style={styles.container}>
		        <Counter1 />
		        <Counter1 />
		        <Counter2 />
		        <Counter2 />
		        <Counter3 />
		        
		    </View>	
		)
	}
}

const styles = StyleSheet.create({
    container: {
	    flex: 1,
	    justifyContent: 'center',
	    alignItems: 'center',
    },
})