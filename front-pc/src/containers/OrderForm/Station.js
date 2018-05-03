import React,{ Component } from 'react'
import { message,Modal } from 'antd'
import axios from 'axios'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'

import { profileStore,orderFormStore } from '../../store'
import * as TableColums from '../../constants/TableColums'
import TableBar from '../../components/TableBar'
import ModalBar from '../../components/ModalBar'
import QueryForm from '../../components/QueryForm'

@observer
class Station extends Component{
	constructor(props){
		 super(props)

		 this.state={
		 	loading:false,
		 	dataSource:[],
		 	modalIndex:0,
		 	modalVisible:false,
		 	modalTitle:'',
		 	modalData:{},
		 	queryForm:{},
		 }
	}
	async componentDidMount(){
		await this.getDataSource({})
	}
	
	//获取表单数据
	async getDataSource(data){
		this.setState({loading:true})

		const res=await axios.post('/vo/search/station',data)

		this.setState({
			dataSource:res.list,
			loading:false,
		})

		return res
	}
	//编辑表单
	handleEdit(record){

		this.setState({
			modalIndex:1,
			modalVisible:true,
			modalTitle:'编辑',
			modalData:record,
			orderId:record.id
		})
		
	}
	//查看详情
	handleDetail(record){
		this.setState({
			modalIndex:2,
			modalVisible:true,
			modalTitle:'详情',
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
		this.setState({queryForm:data})
		await this.getDataSource(data)
	}
	//表单提交
	async handleModalOK(data){
		const { orderId,queryForm }=this.state
		let res={}

		if(orderId===0){
			res=await axios.post('/vo/station',data)
		}else{
			res=await axios.put(`/vo/station/${orderId}`,data)
		}
		
		if(res.code===200){
			message.success('操作成功')
			this.handleCancel()
			await this.getDataSource(queryForm)
		}
	}
	//添加表单
	handleAdd(){
		this.setState({
			modalIndex:1,
			modalVisible:true,
			modalTitle:'添加',
			modalData:{password:'123456'},
			orderId:0
		})
	}
	//底部按钮点击事件
	handleFooterBtnClick(obj){
		const { queryForm }=this.state
		const { selectedRow }=this.table.state
		const that=this

		if(selectedRow.id){
			let modalData={...selectedRow}
			let orderId=0

			if(obj.btnIndex===1){
				this.setState({
					modalIndex:1,
					modalVisible:true,
					modalTitle:obj.text,
					modalData:modalData,
					orderId:orderId
				})
			}
			if(obj.btnIndex===2){
				Modal.confirm({
					title:'温馨提示',
					content: obj.text,
				    okText: '确定',
				    okType: 'danger',
				    cancelText: '取消',
				    async onOk(){
				    	const res=await axios.delete(`/vo/station/${modalData.id}`)

				    	if(res.code===200){
				    		message.success('操作成功')
				    		await that.getDataSource(queryForm)
				    	}
				    }
				})
			}

		}else{
			message.warning('请先选中要操作的数据')
		}
	}
	//渲染表头
	renderColumns(columns){
		const action={
			title: '操作',
	        key: 'operation',
	        width: 100,
	        render: (record) => <a onClick={this.handleEdit.bind(this,record)} href="javascripr:;">编辑</a>,
		}
		return [action,...columns]
	}

	render(){
		const {dataSource,loading,modalIndex,modalVisible,modalTitle,modalData}=this.state
		const initData=toJS(orderFormStore.initData)	
		const footerBtns=[
				{text:'添加',onClick:this.handleAdd.bind(this)},
				{text:'套用',onClick:this.handleFooterBtnClick.bind(this,{btnIndex:1,text:'套用'})},
				{text:'删除',onClick:this.handleFooterBtnClick.bind(this,{btnIndex:2,text:'您确定要删除该条数据吗？'})},
			]

		return (
			<div className='container'>
				<QueryForm 
					ref={(form)=>{this.queryForm=form}}
					onSearch={this.handleQuerySearch.bind(this)}
					initData={initData}
					formItems={TableColums.StationSearch}
				/>
				<TableBar 
					ref={(table)=>{this.table=table}}
					columns={this.renderColumns(TableColums.Station)}
					dataSource={dataSource}
					loading={loading}
					initData={initData}
					onRow={(record)=>({
						onDoubleClick:()=>this.handleDetail(record)
					})}
					pagination={{
						showTotal:(total)=>`共有 ${total} 条数据`,
					}}
					footer={{
						btns:footerBtns,
						color:false
					}}
					rowSelect={true}
				/>
				{modalIndex===1 && 
					<ModalBar.Form 
			      		ref={(form)=>{this.form=form}}
			      		title={modalTitle}
			      		visible={modalVisible}
			      		modalData={modalData}
			      		initData={toJS(initData)}
			      		handleModalOK={this.handleModalOK.bind(this)}
			      		onCancel={this.handleCancel.bind(this)}
			      		confirmLoading={profileStore.asyncLoading}
			      		formItems={TableColums.Station}
			      	/>
				}
				{modalIndex===2 && 
					<ModalBar.Detail 
			      		title={modalTitle}
			      		visible={modalVisible}
			      		onCancel={this.handleCancel.bind(this)}
			      		modalData={modalData}
			      		modalItems={TableColums.Station}
			      	/>
				}
			</div>
		)
	}
}

export default Station