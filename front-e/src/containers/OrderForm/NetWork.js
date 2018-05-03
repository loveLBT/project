import React,{ Component } from 'react'
import { message,Modal } from 'antd'
import axios from 'axios'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import moment from 'moment'
import queryString from 'query-string'
import array from 'lodash/array'

import { profileStore,orderFormStore } from '../../store'
import * as TableColums from '../../constants/TableColums'
import TableBar from '../../components/TableBar'
import ModalBar from '../../components/ModalBar'
import QueryForm from '../../components/QueryForm'

@observer
class NetWork extends Component{
	constructor(props){
		 super(props)

		 this.state={
		 	loading:false,
		 	asyncLoading:false,
		 	dataSource:[],
		 	columns:[],
		 	modalIndex:0,
		 	modalVisible:false,
		 	modalTitle:'',
		 	modalData:{},
		 	orderId:0,
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
	//表单中select组件状态改变事件
	async onModalFormSelectChange(key,value){
		const form=this.form
		if(key==='pq'){
			await orderFormStore.getOrderNumber(value)
			form.setFieldsValue({VfNo:orderFormStore.orderNumber})
		}
		if(key==='VfJkxh' || key==='VfLinexh'){
			this.setState({[key]:value},async ()=>{
				const {VfJkxh,VfLinexh}=this.state
				if(VfJkxh && VfLinexh){
					const params={VfJkxh,VfLinexh}
					const res=await axios.get('/vo/limit',{params})
					
					form.setFieldsValue({
						VfLinelimit2:res.data.summer,
						VfLinelimit3:res.data.winter
					})
				}
			})
		}
	}
	//编辑表单
	handleEdit(record){
		const modalData={...record}
		if(modalData.VfNo){
			modalData.pqIndex=modalData.VfNo.substr(0,1)
		}
		
		this.setState({
			modalIndex:1,
			modalVisible:true,
			modalTitle:'定值单编辑',
			modalData:modalData,
			orderId:modalData.id
		})
		
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
	//添加表单
	async handleAdd(){
		await orderFormStore.getOrderNumber()
		const userInfo=toJS(profileStore.userInfo)
		const initData=toJS(orderFormStore.initData)
		const modalData={
			VfWritername:userInfo.userName,
			VfWritedate:moment(),
			VfStateIndex:5,
			pqIndex:'配',
			VfNo:orderFormStore.orderNumber,
			VfDdgxIndex:parseInt(initData.ddgxID)
		}

		this.setState({
			modalIndex:1,
			modalVisible:true,
			modalTitle:'定值单编辑',
			modalData,
			orderId:0
		})
	}
	//底部按钮点击事件
	async handleFooterBtnClick(obj){
		const { page,queryForm }=this.state
		const { selectedRow }=this.table.state
		const that=this
		
		if(selectedRow.id){
			let modalData={...selectedRow}
			let orderId=0

			if(obj.btnIndex===1 || obj.btnIndex===2){
				if(modalData.VfNo){
					modalData.pqIndex=modalData.VfNo.substr(0,1)
					await orderFormStore.getOrderNumber(modalData.pqIndex) 
				}else{
					message.error('改工单没有编号，不能执行此操作')
					return false
				}

				if(obj.btnIndex===1){
					orderId=0
					modalData.VfNo=orderFormStore.orderNumber
				}
				if(obj.btnIndex===2){
					orderId=modalData.id
					modalData.VfReplaceno=modalData.VfNo
					modalData.VfNo=orderFormStore.orderNumber
				}

				this.setState({
					modalTitle:obj.text,
					modalVisible:true,
					modalIndex:1,
					modalData:modalData,
					orderId:orderId
				})
			}
			if(obj.btnIndex===3){
				Modal.confirm({
					title:'温馨提示',
					content: obj.text,
				    okText: '确定',
				    okType: 'danger',
				    cancelText: '取消',
				    async onOk(){
				    	const res=await axios.put(`/valued_order/${modalData.id}`,{VfState:obj.statusIndex})
				    	if(res.code===200){
				    		message.success('操作成功')
				    		await that.getDataSource({...queryForm,page})
				    	}
				    }
				})
			}
		}else{
			message.warning('请先选中要操作的数据')
		}
	}
	
	//提交表单数据
	async handleModalOK(data){
		const { page,orderId,queryForm }=this.state
		let res={}

		this.setState({asyncLoading:true})
		if(orderId===0){
			res=await axios.post('/valued_order',{...data})
		}else{
			res=await axios.put(`/valued_order/${orderId}`,{...data})
		}
		this.setState({asyncLoading:false})
		
		if(res.code===200){
			message.success('操作成功')
			orderFormStore.removeOrderNumberStorage(data.pq)
			this.handleCancel()
			await this.getDataSource({...queryForm,page})
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
	//表单查询
	async handleQuerySearch(data){
		const { page }=this.state
		this.setState({queryForm:data})
		await this.getDataSource({...data,page})
	}
	//导出
	handleQueryExport(data){
		Modal.confirm({
		    title:'你确定导出吗？',
		    content:'亲！！！导出可能需要一点时间，需要耐心等待哦。',
		    okText: '确定',
		    cancelText:'取消',
		    async onOk(){
		        const url='/export/valued_order'+'?'+queryString.stringify(data)
		      	const year=moment().format('YYYY-MM-DD')
	       	   	var a = document.createElement('a')
	       	   	a.href = url
	       	   	a.download = `定值单${year}.xlsx`
	       		a.click()
		    }
	    })

	}
	//页码改变
	async handlePageChange(page){
		const {queryForm}=this.state
		this.setState({page})
		await this.getDataSource({...queryForm,page})
	}
	//渲染表头
	renderColumns(columns){
		const action={
			title: '操作',
	        key: 'operation',
	        width: 100,
	        render: (record) =><a href='javascript:;' onClick={this.handleEdit.bind(this,record)}>编辑</a>
		}
		return [action,...columns]
	}


	render(){
		const {columns,dataSource,loading,asyncLoading,modalIndex,modalVisible,modalTitle,modalData,total,page}=this.state
		const initData=toJS(orderFormStore.initData)	
		const footerBtns=[
				{text:'添加',onClick:this.handleAdd.bind(this)},
				{text:'套用',onClick:this.handleFooterBtnClick.bind(this,{btnIndex:1,text:'套用定值单'})},
				{text:'替换编号',onClick:this.handleFooterBtnClick.bind(this,{btnIndex:2,text:'替换定值单编号'})},
				{text:'作废',onClick:this.handleFooterBtnClick.bind(this,{btnIndex:3,text:'您确定要作废该定值单数据吗？',statusIndex:4})},
				{text:'设置为待执行',onClick:this.handleFooterBtnClick.bind(this,{btnIndex:3,text:'您确定要设置该定值单为待执行吗？',statusIndex:1})},
				{text:'设置为二次执行',onClick:this.handleFooterBtnClick.bind(this,{btnIndex:3,text:'您确定要设置该定值单为二次待执行吗？',statusIndex:2})}
			]

		return (
			<div>
				<QueryForm 
					ref={(form)=>{this.queryForm=form}}
					onSearch={this.handleQuerySearch.bind(this)}
					onExport={this.handleQueryExport.bind(this)}
					initData={initData}
					formItems={TableColums.NetWorkSearch}
				/>
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
					footer={{
						btns:footerBtns,
						color:true
					}}
					rowClassName={true}
					sorter={true}
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
			      		confirmLoading={asyncLoading && profileStore.asyncLoading}
			      		formItems={columns}
			      		onSelectChange={this.onModalFormSelectChange.bind(this)}
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

export default NetWork