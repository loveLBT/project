import React,{ Component } from 'react'
import { message,Form,Row,Col,Transfer,Select } from 'antd'
import { toJS } from 'mobx'
import axios from 'axios'
import { observer } from 'mobx-react'

import { orderFormStore } from '../../store'
import * as TableColums from '../../constants/TableColums'
import QueryForm from '../../components/QueryForm'

const FormItem = Form.Item
const Option = Select.Option
const filterTransferData=(lists)=>{
	let newLists=[]
	for(let list of lists){
		let item={}
		item.key=list.value
		item.title=list.label
		newLists.push(item)
	}
	return newLists
}
const filterTransferKeys=(lists)=>{
	let newLists=[]
	for(let list of lists){
		newLists.push(list.value)
	}
	return newLists
}

@observer
class CentralControl extends Component{
	constructor(props) {
	    super(props)
	
	    this.state = {
			dataSource:[],
			targetSource:[],
			targetKeys:[],
			dataSourcekeys:[],
			selectedKeys: [],
			allTransferData:[],
			dataSourceID:'',
			targetSourceID:''
	    }
	}
	//新建集控站
	async handleSubmit(data){
		const from=this.queryForm
		const res=await axios.post('/vo/central_control_station',data)
		if(res.code===200){
			message.success('操作成功')
			from.resetFields()
			await orderFormStore.getInitData()
		}
	}
	async handleSelectChange(key1,preData,key2,key3,value){
		const res=await axios.get(`/vo/central_control_station/${value}`)
		this.setState({
			allTransferData:preData.concat(filterTransferData(res.list)),
			[key1]:filterTransferData(res.list),
			[key2]:value,
			[key3]:filterTransferKeys(res.list)
		})
		
	}
	async handleTransferChange(nextTargetKeys, direction, moveKeys){
		const {targetSourceID,dataSourceID}=this.state
		if(!targetSourceID){
			message.warning('请选择目标集控站')
		}else if(!dataSourceID){
			message.warning('请选择源集控站')
		}else{
			let data={}
			if(direction==='right'){
				data={
					sourceID:dataSourceID,
					tiggerID:targetSourceID,
					stationID:moveKeys
				}
			}else{
				data={
					sourceID:targetSourceID,
					tiggerID:dataSourceID,
					stationID:moveKeys
				}
			}

			const res=await axios.post('/vo/migrate',data)
			if(res.code==200){
				message.success('迁移成功')
				
				const res1=await axios.get(`/vo/central_control_station/${dataSourceID}`)
				const res2=await axios.get(`/vo/central_control_station/${targetSourceID}`)

				this.setState({ 
					targetSource:filterTransferData(res2.list),
					dataSource:filterTransferData(res1.list),
					targetKeys:filterTransferKeys(res2.list)
				})
			}else{
				message.error('迁移失败')
			}
		}
	}
	handleTransferSelectChange(sourceSelectedKeys, targetSelectedKeys){
		this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] })
	}
	render(){
		const { dataSource,targetSource,selectedKeys,allTransferData,dataSourceID,targetSourceID,dataSourcekeys,targetKeys }=this.state
		const initData=toJS(orderFormStore.initData)
		const optios=initData.jkz	
		const formItemLayout = {
		    labelCol: {
		        xs: { span: 24 },
		        sm: { span: 8 },
		    },
		    wrapperCol: {
		        xs: { span: 24 },
		        sm: { span: 16 },
		    },
	    }

		return (
			<div className='container centralControl'>
				<QueryForm 
					ref={(form)=>{this.queryForm=form}}
					onSubmit={this.handleSubmit.bind(this)}
					initData={initData}
					formItems={TableColums.CentralControl}
				/>
				<Row>
					<Form>
						<Col span={8}>
							<FormItem  {...formItemLayout} label='源集控站'>
						        <Select onChange={this.handleSelectChange.bind(this,'dataSource',targetSource,'dataSourceID','dataSourcekeys')}>
									{optios.map((option)=>
										<Option 
											key={option.value} 
											value={option.value}
										>
											{option.label}
										</Option>
									)}
								</Select>
					        </FormItem>
						</Col>
						<Col span={8}>
							<FormItem  {...formItemLayout} label='目标集控站'>
						        <Select onChange={this.handleSelectChange.bind(this,'targetSource',dataSource,'targetSourceID','targetKeys')}>
									{optios.map((option)=>
										<Option 
											key={option.value} 
											value={option.value}
										>
											{option.label}
										</Option>
									)}
								</Select>
					        </FormItem>
						</Col>
					
					</Form>
				</Row>
				<Row>
					<Col span={16}>
						
						<Transfer
							className='transfer'
					        dataSource={allTransferData}
					        titles={['来源', '目标']}
					        listStyle={{width:'33.3%',height:'300px'}}
					        targetKeys={targetKeys}
					        selectedKeys={selectedKeys}
					        notFoundContent='列表为空'
					        operations={['迁移到', '迁回到']}
					        onChange={this.handleTransferChange.bind(this)}
					        onSelectChange={this.handleTransferSelectChange.bind(this)}
					        render={item => item.title}
					      />
					</Col>
				</Row>

			</div>
		)
	}
}

export default CentralControl