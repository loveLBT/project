import React,{Component} from 'react'
import {View,Text,ListView,StyleSheet} from 'react-native'
import {observer} from 'mobx-react'

import PageList from  './PageList'
import * as Ajax from '../../src/commonFunc/Ajax'

class SamplePage extends PageList {
	fetchData(page){
		const url='http://rap.taobao.org/mockjs/13523/api/videoList'
		const params={page}
		
		return Ajax.get(url,params)
	}
}

@observer
class Demo extends Component {
	ds=new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!=r2}) 
	pageList=new SamplePage()

	renderRow(row){
		return (
			<View style={styles.item}>
				<Text>{`${row.title}`}</Text>
			</View>
		)
	}
	render(){
		return (
			<ListView 
				enableEmptySections={true}
				dataSource={this.ds.cloneWithRows(this.pageList.items.slice(0))}
				renderRow={this.renderRow.bind(this)}
				onEndReached={this.pageList.getMoreList}
				onEndReachedThreshold={20}
				showsVerticalScrollIndicator={false}
				renderFooter={this.pageList.renderFooter}
				style={styles.container}
			/>
		)
	}
}

const styles = StyleSheet.create({
    container: {
	    flex: 1,
	    backgroundColor: 'white',
    },
    item: {
	    height: 40,
	    alignSelf: 'center',
    }
})

export default Demo