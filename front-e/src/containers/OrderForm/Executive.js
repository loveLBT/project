import React,{ Component } from 'react'
import { message } from 'antd'
import axios from 'axios'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import array from 'lodash/array'

import { profileStore,orderFormStore } from '../../store'
import * as TableColums from '../../constants/TableColums'
import TableBar from '../../components/TableBar'
import ModalBar from '../../components/ModalBar'

@observer
class Executive extends Component{
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
		 	orderId:0,
		 	page:1,
		 	total:0,
		 	btn:{label:'待执行',value:1}
		 }
	}
	async componentDidMount(){
		await this.getTableData()
	}
	//同时请求表头和表单数据
	async getTableData(){
		const { btn,page }=this.state

		return await axios.all([this.getColumns(),this.getDataSource({VfState:btn.value,page})])
	}
	//获取表单数据
	async getDataSource(data){
		const initData=toJS(orderFormStore.initData)
		const newData={
			...data,
			size:10,
			CCStationID:initData.stationID,
		}
		this.setState({
			loading:true,
		})

		const res=await axios.post('/vo/search',{...newData})

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
			columns:[...columns]
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
	//编辑表单
	handleEdit(record){
		const userInfo=toJS(profileStore.userInfo)
		const modalData={
			VfRununit:userInfo.userName,
			VfCheckunit:'修试工区'
		}

		this.setState({
			modalIndex:1,
			modalVisible:true,
			modalTitle:'定值单执行',
			modalData:modalData,
			orderId:record.id
		})
	}
	//提交表单数据
	async handleModalOK(data){
		const { page,orderId,btn }=this.state
		const res=await axios.post('/vf/execution',{...data,ID:orderId})
		
		if(res.code===200){
			message.success('操作成功')
			orderFormStore.removeOrderNumberStorage(data.pq)
			this.handleCancel()
			await this.getDataSource({VfState:btn.value,page})
		}
		
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
	//页码改变
	async handlePageChange(page){
		const {btn}=this.state
		this.setState({page})
		await this.getDataSource({VfState:btn.value,page})
	}

	//设置底部按钮
	setFooterBtns(btns){
		let newBtns=[]
		btns.map((btn)=>{
			let newBtn={}
			newBtn.text=btn.label
		    newBtn.onClick=this.handleFooterBtnClick.bind(this,btn)
			newBtns.push(newBtn)
		})

		return newBtns
	}
	//底部按钮点击获取数据
	handleFooterBtnClick(btn){
		const { page }=this.state
		this.setState({btn})
		this.getDataSource({VfState:btn.value,page})
	}
	//渲染表头
	renderColumns(columns){
		const { btn }=this.state
		const action={
			title: '操作',
	        key: 'operation',
	        width: 100,
	        render: (record) => <a onClick={this.handleEdit.bind(this,record)} href="javascripr:;">执行</a>,
		}
		if(btn.value===1 || btn.value===2){
			return [action,...columns]
		}else{
			return columns
		}
	}

	render(){
		const {columns,dataSource,loading,modalIndex,modalVisible,modalTitle,modalData,total,page,btn}=this.state
		const initData=toJS(orderFormStore.initData)	

		return (
			<div>
				<h3>【{btn.label}】定值单</h3>
				<TableBar 
					ref={(table)=>{this.table=table}}
					columns={this.renderColumns(columns)}
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
					rowClassName={true}
					footer={{
						btns:this.setFooterBtns(initData.status),
						color:true
					}}
					sorter={true}
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
			      		formItems={TableColums.Executive}
			      	/>
				}
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

export default Executive