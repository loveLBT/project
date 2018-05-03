import React from 'react'
import { Form,Select,Input,Button,Row,Col } from 'antd'

import './style.css'

const FormItem=Form.Item
const Option = Select.Option

const QueryForm=Form.create()((props)=>{
	const { onSubmit, onSearch, onExport, formItems, initData, form}=props
	const { getFieldDecorator,resetFields } = form
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
	const handleSubmit=(e)=>{
		e.preventDefault()
		form.validateFields((err,values)=>{
			if(!err){
				if(onSearch){
					onSearch(values)
				}
				if(onSubmit){
					onSubmit(values)
				}
			}
		})
	}
	const handleExport=()=>{
		form.validateFields((err,values)=>{
			onExport(values)
		})
	}
	const renderSelectOptions=(typeIndex)=>{
		let options=[<Option key='null' value={null}>全部</Option>]

		if(initData[typeIndex]){
			initData[typeIndex].map((option)=>{
				options.push(
					<Option key={option.value} value={option.value}>{option.label}</Option>
				)
			})
		}
		

		return options
	}
	const renderFormItemType=(item)=>{
		switch(item.type){
			case 'select':
				return (
					<Select showSearch optionFilterProp="children" placeholder={`请选择${item.title}`}>
						{renderSelectOptions(item.optionIndex)}
					</Select>
				)
				break
			default :
				return (
					<Input placeholder={`请输入${item.title}`} />
				)
		}
	}
	const renderFormItems=()=>{
		return formItems.map((item,index)=>{
			return (
				<Col span={8} key={index}>
					<FormItem {...formItemLayout} label={item.title}>
			            {getFieldDecorator(item.dataIndex,{
			            	initialValue:item.initialValue,
			            	rules:item.rules || []
			            })(
			              	renderFormItemType(item)
			            )}
		            </FormItem>
				</Col>
			)
		})
	}

	return (
		<Form onSubmit={handleSubmit} className='queryform'>
			<Row>
	    		{renderFormItems()}
	    		{onSubmit && 
	    			<Col span={8}>
	    				<FormItem>
	    					<Button type="primary" htmlType="submit" style={{marginLeft:'10px'}} >新建</Button>
	    				</FormItem>
	    			</Col>
	    		}
	    	</Row>
			<Row>
				<Col style={{textAlign:'right'}} span={24}>
					{onSearch && 
						<Button type='primary' htmlType="submit" style={{marginRight:'10px'}} >查询</Button>
					}
					{onExport && 
						<Button onClick={handleExport}>导出</Button>
					}
					
				</Col>
			</Row>
		</Form>
	)
})
export default QueryForm