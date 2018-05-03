import React,{ Component } from 'react'
import axios from 'axios'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import array from 'lodash/array'

import { profileStore,orderFormStore } from '../../store'
import * as TableColums from '../../constants/TableColums'
import TableBar from '../../components/TableBar'
import ModalBar from '../../components/ModalBar'
import QueryForm from '../../components/QueryForm'

@observer
class Search extends Component{
	constructor(props){
		 super(props)

		 this.state={
		 	loading:false,
		 	dataSource:[],
		 	columns:[],
		 	modalIndex:0,
		 	modalVisible:false,
		 	modalTitle:'',
		 	modalData:{},
		 	queryForm:{},
		 	page:1,
		 	total:0
		 }
	}
	async componentDidMount(){
		await this.getTableData()
	}
	//同时请求表头和表单数据
	async getTableData(){
		return await axios.all([this.getColumns(),this.getDataSource({page:1})])
	}
	//获取表单数据
	async getDataSource(data){
		this.setState({loading:true})

		const res=await axios.post('/vo/search',{...data,size:10})

		this.setState({
			dataSource:res.list,
			loading:false,
			total:res.total
		})

		return res
	}
	//1.获取表头 
	async getColumns(){
		const columns=[]
		const res=await axios.get('/vo/table_head')

		res.data.map((item)=>{
			const col=JSON.parse(item)

			columns.push(col)
		})

		this.setState({
			columns:columns
		})

		return res
	}
	//查看详情
	handleDetail(record){
		this.setState({
			modalIndex:2,
			modalVisible:true,
			modalTitle:'定值单详情',
			modalData:record
		})
	}
	
	//取消
	handleCancel(){
		this.setState({
			modalIndex:0,
			modalVisible:false,
			modalTitle:'',
			modalData:{}
		})
	}
	//表单查询
	async handleQuerySearch(data){
		const { page }=this.state
		this.setState({queryForm:data})
		await this.getDataSource({...data,page})
	}
	//页码改变
	async handlePageChange(page){
		const {queryForm}=this.state
		this.setState({page})
		await this.getDataSource({...queryForm,page})
	}
	

	render(){
		const {columns,dataSource,loading,modalIndex,modalVisible,modalTitle,modalData,total,page}=this.state
		const initData=toJS(orderFormStore.initData)	
		
		return (
			<div>
				<QueryForm 
					ref={(form)=>{this.queryForm=form}}
					onSearch={this.handleQuerySearch.bind(this)}
					initData={initData}
					formItems={TableColums.NetWorkSearch}
				/>
				<TableBar 
					ref={(table)=>{this.table=table}}
					columns={columns}
					dataSource={dataSource}
					loading={loading}
					initData={initData}
					onRow={(record)=>({
						onDoubleClick:()=>this.handleDetail(record)
					})}
					pagination={{
						total:total,
						showTotal:(total)=>`共有 ${total} 条数据`,
						onChange:this.handlePageChange.bind(this)
					}}
					current={page}
					footer={{
						btns:[],
						color:true
					}}
					rowClassName={true}
					sorter={true}
				/>
				
				{modalIndex===2 && 
					<ModalBar.Detail 
			      		title={modalTitle}
			      		visible={modalVisible}
			      		onCancel={this.handleCancel.bind(this)}
			      		modalData={modalData}
			      		modalItems={array.uniqBy([...columns,...TableColums.Executive],'dataIndex')}
			      	/>
				}
			</div>
		)
	}
}

export default Search