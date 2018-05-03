import React from 'react'
import { Form,Row,Col,Select,Checkbox,Input,Button,InputNumber } from 'antd'
import objectAssign from 'object-assign'

import './style.css'

const FormItem=Form.Item
const Option = Select.Option

const FormBar=Form.create()((props)=>{
	const { form,formItems,formData,initData,layout,formBtns }=props
	const { getFieldDecorator } = form
	const colSpan=layout==='inline'?8:24
	const formItemLayout = {
	    labelCol: {
	        xs: { span: 24 },
	        sm: { span: 10 },
	    },
	    wrapperCol: {
	        xs: { span: 24 },
	        sm: { span: 14 },
	    },
    }

	const renderFormItemType=(item)=>{
		switch(item.type) {
			case 'select':
				const options=initData[item.dataIndex] || []

				return (
					<Select showSearch optionFilterProp='children' placeholder={`请选择${item.title}`}>
						{options.map((option)=>
							<Option key={option[item.dataIndex]} value={option[item.dataIndex]}>{option[item.nameIndex]}</Option>
						)}
					</Select>
				)
				break

			case 'checkbox':
				return (
					<Checkbox />
				)
				break
			case 'input':
				return (
					<Input placeholder={`请输入${item.title}`} />
				)
				break
			case 'number':
				return (
					<InputNumber min={1} placeholder={`请输入${item.title}`} />
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
			const config=objectAssign(
				{},
				item.config,
				formData[`${item.dataIndex}`]?{initialValue:formData[`${item.dataIndex}`]}:null
			)

			return (
				<Col span={colSpan} key={index}>
					<FormItem {...formItemLayout} label={item.title}>
						{getFieldDecorator(item.dataIndex,config)(
							renderFormItemType(item)
						)}
					</FormItem>
				</Col>
			)
		})
	}
	return (
		<Form
			className='form'
			style={props.style} 
		>
			
			<Row gutter={24}>
				{renderFormItems()}
			</Row>
			{formBtns && 
				<Row>
					<Col span={24} style={{ textAlign: 'right' }}>
						{formBtns.map((item,index)=>
							<Button key={index} type="primary" onClick={item.handleClick}>{item.text}</Button>
						)}
					</Col>
				</Row>
			}
			
		</Form>
	)
})

FormBar.defaultProps={
	formItems:[],
	formData:{},
	initData:{},
	layout:'horizontal',
	formBtns:[]
}

export default FormBar