import React,{ Component } from 'react'
import {
    StyleSheet,
    ScrollView,
    Text,
    View,
   	TouchableOpacity
} from 'react-native'

import { observable,action } from 'mobx'
import { observer } from 'mobx-react/native'

const titles = ['Eat', 'Drink', 'Think']

class Todo {
	id=`${Date.now()}${Math.floor(Math.random()*10)}`
	@observable title=''
	@observable done = false

	constructor(title) {
		this.title=title
	}
}

function randomTodoTitle(){
	return titles[Math.floor(Math.random()*titles.length)]
}

@observer
class TodoItem extends Component {
	@action handlePress(){
		const {data}=this.props
		data.done=!data.done
	}
	render(){
		const {data}=this.props
		return (
			<Text 
				style={[styles.todo, data.done && styles.done]}
				onPress={this.handlePress.bind(this)}
			>
				{data.title}
			</Text>
		)
	}
}

@observer
export default class TodoList extends Component{
	@observable todoList = []

	renderItem(data){
		return (
			<TodoItem key={data.id} data={data} />
		)
	}
	@action handleBtnPress(){
		 this.todoList.push(new Todo(randomTodoTitle()))
	}
	render(){
		return (
			<ScrollView style={styles.container} contentContainerStyle={styles.content}>
		        {this.todoList.map(this.renderItem)}

		        <TouchableOpacity onPress={this.handleBtnPress.bind(this)}>
		        	<Text>btn</Text>
		        </TouchableOpacity>

	        </ScrollView>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  todo: {
    fontSize: 20,
  },
  done: {
    color: 'gray',
    textDecorationLine: 'line-through',
  },
});