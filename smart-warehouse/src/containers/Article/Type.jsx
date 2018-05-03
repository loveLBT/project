// import React,{ Component } from 'react'
// // import axios from 'axios'

// import config from '../../config/config'
// import TableBar from '../../components/TableBar'
// import FormBar from '../../components/FormBar'
// import TitleBar from '../../components/TitleBar'
// import api from '../../api/api';

// class Type extends Component {
// 	constructor(props) {
// 	 	super(props)
	
// 	  	this.state = {
// 	  		dataSource:[],
// 	  		formData:{},
// 	  		initData:{}
// 	  	}
// 	}
// 	componentDidMount(){
// 		this.getTAsyncData()
// 	}
// 	//进入页面获取异步数据
// 	async getTAsyncData(){
// 		await Promise.all[[this.getListToolParentType(),this.getDataSource()]]
// 		// await api.axios.all([this.getListToolParentType(),this.getDataSource()])
// 	}
// 	//获取表格数据源
// 	async getDataSource(){
		
// 		const res=await api.getListToolType();
// 		console.log(res)
// 		if(res.code===200){
// 			this.setState({
// 				dataSource:res.content
// 			})
// 		}
// 	}
// 	//获取物品类型所属大类
// 	async getListToolParentType(){
// 		let initData=this.state.initData
// 		const res=await api.getListToolParentType();
// 		initData.parent_type_id=res.content
// 		this.setState({
// 			initData
// 		})
// 	}
// 	//提交表单数据
// 	handleFormSubmit(e){
// 		e.preventDefault()
		
// 		this.form.validateFields(async (err, values) =>{
// 			if(!err){
// 				const res=await api.insertToolType(values);
// 				if(res.code===200){
// 					await this.getDataSource()
// 				}
// 			}
// 		})
// 	}
// 	//删除表格行事件
// 	handleTableRowDelete(record){
// 		console.log(record)
// 	}
// 	//modal框表单事件提交
// 	handleModalSubmit(e){
// 		e.preventDefault()

// 		this.table.form.validateFields(async (err, values)=>{
// 			if(!err){
// 				console.log(values)
// 			}
// 		})
// 	}

// 	render(){
// 		// const { dataSource,formData,initData }=this.state
// 		const { initData }=this.state

// 		return (
// 			<div className='type'>
// 				<TitleBar title='新增物品类型' />
// 				<div className='wrapper' style={{marginBottom:'15px'}}>
// 					<FormBar 
// 						ref={form=>this.form=form}
// 						layout='inline' 
// 						formItems={config.queryFormType}
// 						initData={initData}
// 						formBtns={[
// 							{text:'添加',handleClick:this.handleFormSubmit.bind(this)}
// 						]}

// 					/>
// 				</div>
// 				<TitleBar title='物品类型' />
// 				<div className='wrapper'>
// 					<TableBar 
// 						ref={table=>this.table=table}
// 						columns={config.columns}
// 						dataSource={config.dataSource}
// 						pagination={{
// 							size:'small'
// 						}}
// 						formInitData={initData}
// 						showNumColumn={true}
// 						defaultActionColumns={{
// 							handleTableRowDelete:this.handleTableRowDelete.bind(this),
// 							handleModalSubmit:this.handleModalSubmit.bind(this)
// 						}}
// 					/>
// 				</div>
// 			</div>
// 		)
// 	}
// }

// export default Type


import React, { Component } from 'react'
import FormBar from "../../components/FormBar";
import DynamiTable from "../../components/DynamiTable";
// import "./SysManage.less"
import api from '../../api/api';
import { message } from "antd";

class Type extends Component {
	state = {
		dataList: [],
		formItems: [],
		tableLoading: true,
		columns: [],
		selectModel: {},
		page: {
			showQuickJumper: true,
			page: 1,
			onChange: (page) => {
				this.getList(page);
			},
			total: 0,
		}
	};

	componentWillMount() {
		this.getFormHeader();
		this.getHeader();
		this.getList();
	}

	getHeader = async () => {
		let res = await api.getHeader('xinzengwupinleixing');
		let formItems = res.content;
		console.log(formItems)
		this.setState({ formItems });
	}

	getList = async (pageNum) => {
		pageNum = pageNum || this.state.page.page;;
		let res = await api.getListToolType(pageNum);
		let dataList = [];
		
		if (res.code === 200) {
			dataList = res.content.list.slice();
			delete res.content.list
			let page = Object.assign(this.state.page, res.content);
			dataList.map((item, i) => {
				item.xuhao = i + 1 + this.state.page.pageSize * (this.state.page.page - 1)
				return true;
			})
			this.setState({ dataList, tableLoading: false ,page})
		} else {
			this.setState({ dataList, tableLoading: false })
		}
	}

	getFormHeader = async () => {
		let res = await api.getFormHeader('wupinleixing');
		let columns = res.contents.form;
		let selectModel = res.contents.selectModel;
		this.setState({ columns, selectModel })
	}

	handleFormSubmit(e) {
		e.preventDefault()
		this.form.validateFields(async (err, values) => {
			if (!err) {
				console.log(values)
				let res = await api.insertToolType(values);
				if (res.code === 200) {
					message.success('添加成功');
					this.getList();
				}
			}
		})
	}

	handleModalEdit = async (e, j) => {
		this.table.form.validateFields(async (err, values) => {
			if (!err) {
				console.log(e, values);
				let flag = false;
				for (let k in values) {
					let ele = values[k];
					if (e[k] && e[k] !== ele) {
						flag = true;
					}
				}
				if (flag) {
					let res = await api.updateToolType(e.tool_type_id, values);
					if (res.code === 200) {
						message.success('修改成功');
						this.getList();
					}
				}
			}
		})
	}


	del = async (recode) => {
		let res = await api.deleteToolType(recode.tool_type_id);
		if (res.code === 200) {
			message.success('删除成功');
			this.getList();
		}
	}
	
	render() {
		return (
			<div>
				<div className="subTit">添加设备</div>
				<div className='shadowBox'>
					<FormBar
						ref={form => this.form = form}
						formItems={this.state.formItems}
						layout='inline'
						formBtns={[
							{ text: '添加', handleClick: this.handleFormSubmit.bind(this) }
						]}
					/>
				</div>

				<div className="subTit">设备列表</div>
				<div className="shadowBox">
					<DynamiTable
						ref={table => this.table = table}
						columns={this.state.columns}
						dataSource={this.state.dataList}
						selectModel={this.state.selectModel}
						del={this.del}
						handleModalEdit={this.handleModalEdit}
						bordered
						loading={this.state.tableLoading}
						pagination={this.state.page}
						size="middle" />
				</div>
			</div>
		)
	}
}

export default Type
