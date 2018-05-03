import React,{ Component } from 'react'
import axios from 'axios'

import config from '../../config/config'
import TableBar from '../../components/TableBar'
import FormBar from '../../components/FormBar'
import TitleBar from '../../components/TitleBar'

class Type extends Component {
	constructor(props) {
	 	super(props)
	
	  	this.state = {
	  		dataSource:[],
	  		formData:{},
	  		initData:{}
	  	}
	}
	componentDidMount(){
		this.getTAsyncData()
	}
	//进入页面获取异步数据
	async getTAsyncData(){
		await axios.all([this.getListToolParentType(),this.getDataSource()])
	}
	//获取表格数据源
	async getDataSource(){
		const res=await axios.get('/toolType/getListToolType')
		console.log(res)
		if(res.code===200){
			this.setState({
				dataSource:res.content
			})
		}
	}
	//获取物品类型所属大类
	async getListToolParentType(){
		let initData=this.state.initData
		const res=await axios.get('/toolParentType/getListToolParentType')

		initData.parent_type_id=res.content

		this.setState({
			initData
		})
	}
	//提交表单数据
	handleFormSubmit(e){
		e.preventDefault()
		
		this.form.validateFields(async (err, values) =>{
			if(!err){
				const res=await axios.post('/toolType/insertToolType',values)
				if(res.code===200){
					await this.getDataSource()
				}
			}
		})
	}
	//删除表格行事件
	handleTableRowDelete(record){
		console.log(record)
	}
	//modal框表单事件提交
	handleModalSubmit(e){
		e.preventDefault()

		this.table.form.validateFields(async (err, values)=>{
			if(!err){
				console.log(values)
			}
		})
	}

	render(){
		const { dataSource,formData,initData }=this.state

		return (
			<div className='type'>
				<TitleBar title='新增物品类型' />
				<div className='wrapper' style={{marginBottom:'15px'}}>
					<FormBar 
						ref={form=>this.form=form}
						layout='inline' 
						formItems={config.queryFormType}
						initData={initData}
						formBtns={[
							{text:'添加',handleClick:this.handleFormSubmit.bind(this)}
						]}

					/>
				</div>
				<TitleBar title='物品类型' />
				<div className='wrapper'>
					<TableBar 
						ref={table=>this.table=table}
						columns={config.columns}
						dataSource={config.dataSource}
						pagination={{
							size:'small'
						}}
						formInitData={initData}
						showNumColumn={true}
						defaultActionColumns={{
							handleTableRowDelete:this.handleTableRowDelete.bind(this),
							handleModalSubmit:this.handleModalSubmit.bind(this)
						}}
					/>
				</div>
			</div>
		)
	}
}

export default Type