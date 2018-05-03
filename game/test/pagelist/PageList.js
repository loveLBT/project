import React from 'react'
import { observable,computed,runInAction,action } from 'mobx'
import { View,ActivityIndicator,StyleSheet } from 'react-native'


export default class PageList {
	@observable isFetching = false
	@observable isRefreshing = false
	@observable items = []
	@observable count = -1
	@observable page = 1

	constructor() {
		this.getList(1)
	}

	@computed get isOver(){
		return this.count>=0 && this.items.length>=this.count
	}

	@action getList=async (page)=>{
		if(page!==0){
			this.isFetching=true
		}else{
			this.isRefreshing=true
		}

		const res=await this.fetchData(page)

		runInAction(()=>{
			if(res){
				this.count=res.count
				this.page+=1

				if(page!==0){
					this.items.splice(this.items.length,0,...res.lists)
				}else{
					this.items.splice(0,0,...res.lists)
				}
				
				this.isFetching=false
				this.isRefreshing=false
			}
		})
		

	}
	@action getMoreList=()=>{
		if(this.isOver || this.isFetching){
			return 
		}
		return this.getList(this.page)
	}
	@action getRefreshList=()=>{
		if(this.isOver || this.isRefreshing){
			return 
		}
		return this.getList(0)
	}

	renderFooter(){
		if(this.isOver){
			return (
				<View style={styles.loadingMore}>
					<Text style={styles.loadingText}>没有更多了</Text>
				</View>
			)
		}
		return <ActivityIndicator
		            style={styles.loadingMore}
		        />
	}
} 

const styles=StyleSheet.create({
	loadingMore:{
		marginVertical:20
	},
	loadingText:{
		color:'#777',
    	textAlign:'center'
	}
})
