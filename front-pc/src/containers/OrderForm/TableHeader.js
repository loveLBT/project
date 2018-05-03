import React,{ Component } from 'react'
import { Form,Button,Row,Col,Checkbox,Select,message } from 'antd'
import axios from 'axios'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'

import { orderFormStore } from '../../store'

const Option = Select.Option
const FormItem=Form.Item

@observer
class TableHeader extends Component{
	constructor(props){
		super(props)

		this.state={
			allTableHead:[],
			defaultSelect:[],
			allSelect:[],
			roleId:null,
		}
	}
	componentDidMount(){
		this.getAllTableHead()
	}
	
	async getAllTableHead(){
		const res=await axios.get('/vo/table_head_items')

		let allSelect=[]
		let allTableHead=res.data

		allTableHead.map((item)=>{
			allSelect.push(item.dataIndex)
		})

		this.setState({
			allSelect,
			allTableHead,
		})
	}
	async handleRoleChange(value){
		const res=await axios.get(`/vo/role_table_head/${value}`)

		this.setState({
			defaultSelect:res.data,
			roleId:value
		})
		this.props.form.resetFields()	
	}
	handleAllSelect(e){
		const {allSelect}=this.state
		if(e.target.checked){
			this.setState({
				defaultSelect:allSelect
			})
		}else{
			this.setState({
				defaultSelect:[]
			})
		}
	}
	async handleSubmit(e){
		e.preventDefault()
		const {roleId}=this.state

		this.props.form.validateFields(async (err, values) => {
			if(roleId){
				let tableHeads=[]
				for(let key in values){
					if(values[key]){
						tableHeads.push(key)
					}
				}
				const data={
					roleID:roleId,
					items:tableHeads
				}

				const res=await axios.put('/vo/table_head',data)
				if(res.code==200){
					message.success('表头配置成功')
				}

			}else{
				 message.error('请选择角色名称')
			}
		})
	}
	render(){
		const { allTableHead, defaultSelect }=this.state
		const { form }=this.props
		const { getFieldDecorator }=form
		const initData=toJS(orderFormStore.initData)
		const roles=initData.roles

		return (
			<div className='container tableHeader'>
				<Form onSubmit={this.handleSubmit.bind(this)}>
					<Row>
						<Row>
							<Col span={3}><label>角色名称：</label></Col>
							<Col span={8}>
								<Select onChange={this.handleRoleChange.bind(this)} placeholder={'请选择角色名称'}>
									{roles.map((role)=>
										<Option key={role.value} value={role.value}>{role.label}</Option>
									)}
								</Select>
							</Col>
						</Row>
						<hr />
						<Row>
							<Col span={3}><label>全选/全不选</label></Col>
							<Col span={16}>
								<Checkbox 
									defaultChecked={false} 
									onChange={this.handleAllSelect.bind(this)}
								/>
							</Col>
						</Row>
						<hr />
						<Row>
							<Col span={3}><label>表头配置：</label></Col>
							<Col span={16}>
								<Row>
									{allTableHead.length>0 && allTableHead.map((item,index)=>
										<Col key={index} span={6}>
											<FormItem>
									            {getFieldDecorator(item.dataIndex,{
									            	initialValue:defaultSelect.includes(item.dataIndex),
									            	valuePropName:'checked'
									            })(
									              	<Checkbox>{item.title}</Checkbox>
									            )}
								            </FormItem>
										</Col>
									)}
								</Row>
							</Col>
						</Row>
					</Row>
					<Row>
						<Col style={{textAlign:'right'}} span={24}>
							<Button htmlType="submit" style={{marginLeft:'10px'}} size='large' type="primary">确定</Button>
						</Col>
					</Row>
				</Form>
			</div>
		)
	}
}

export default Form.create()(TableHeader)  