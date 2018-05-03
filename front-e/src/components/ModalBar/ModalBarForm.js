import React,{Component} from 'react'
import { Modal,Form,Select,Checkbox,Input,DatePicker,InputNumber,Upload,Button,Icon,message } from 'antd'

const FormItem=Form.Item
const Option=Select.Option
const TextArea=Input.TextArea

class ModalBarForm extends Component {
	static defaultProps={
		formItems:[],
		initData:{}
	}
	handleUpload(info){
		let value=null

	    if (info.file.status === 'done') {
	    	message.success('文件上传成功')
	    	value=info.fileList[0].response.data.id
	    }else if (info.file.status === 'error') {
	    	message.error(`${info.file.name} 文件上传失败`)
	    }

	    
	    return value
	}
	handleSelect(key,value){
		const { onSelectChange }=this.props
		if(onSelectChange){
			onSelectChange(key,value)
		}
		
		return value
	}
	renderFormItemType(item,initData){
		const {form,modalData}=this.props
		const {getFieldDecorator}=form
		

		switch(item.type) {
			case 'select':
				const options=initData[item.optionIndex]
				
				return (
					getFieldDecorator(item.dataIndex,{
						initialValue:modalData[`${item.dataIndex}Index`] || item.initialValue,
						rules:item.rules || [],
						getValueFromEvent:this.handleSelect.bind(this,item.dataIndex)
					})(
						<Select>
							{options.map((option)=>
								<Option key={option.value} value={option.value}>{option.label}</Option>
							)}
						</Select>
					)
					
				)
				break
			case 'checkbox':
				return (
					getFieldDecorator(item.dataIndex,{
						initialValue:modalData[`${item.dataIndex}Index`] || item.initialValue,
						rules:item.rules || [],
						valuePropName:'checked'
					})(
						<Checkbox />
					)
					
				)
				break
			case 'datepicker':
				return (
					getFieldDecorator(item.dataIndex,{
						initialValue:modalData[`${item.dataIndex}Index`] || null,
					})(
						<DatePicker placeholder='选择日期' showTime format='YYYY-MM-DD HH:mm:ss' />
					)
				)
				break
			case 'checkboxgroup':
				const checkboxs=initData[item.optionIndex]

				return (
					getFieldDecorator(item.dataIndex,{
		            	initialValue:modalData[`${item.dataIndex}Index`] || item.initialValue,
		            })(
		              	<Checkbox.Group options={checkboxs} />
		            )
					
				)
				break
			case 'inputnumber':
				return (
					getFieldDecorator(item.dataIndex,{
		            	initialValue:modalData[item.dataIndex] || item.initialValue
		            })(
		              	<InputNumber style={{width:'100%'}} placeholder={`请输入${item.title}`} />
		            )
				)
				break
			case 'textarea':
				return (
					getFieldDecorator(item.dataIndex,{
		            	initialValue:modalData[item.dataIndex] || item.initialValue
		            })(
		              	<TextArea type='textarea' placeholder={`请输入${item.title}`} autosize  />
		            )
				)
				break
			case 'upload':
				let defaultFileList=[]
				if(modalData[`${item.dataIndex}Path`]){
					defaultFileList=[
						{
							uid:1,
							name:modalData[`${item.dataIndex}Name`],
							status:'done',
							url:modalData[`${item.dataIndex}Path`],
						}
					]
				}
				const props={
					action:item.action,
					defaultFileList,
					onPreview:(file)=>{
						var a = document.createElement('a')
			       	   	a.href = file.url
			       	   	a.download = file.name
			       		a.click()
					}
				}
				return (
					getFieldDecorator(item.dataIndex,{
		            	initialValue:modalData[`${item.dataIndex}Index`] || item.initialValue,
		            	getValueFromEvent:this.handleUpload.bind(this)
		            })(
		              	<Upload {...props}>
							<Button>
								<Icon type='upload' />上传
							</Button>
						</Upload>
		            )
				)
				break
			case 'input':
				return (
					getFieldDecorator(item.dataIndex,{
						initialValue:modalData[`${item.dataIndex}`] || item.initialValue,
						rules:item.rules || []
					})(
						<Input placeholder={`请输入${item.title}`} />
					)
					
				)
				break

		}
	}
	renderFormItems(items,initData){
		const formItemLayout = {
		   	labelCol: {
		        xs: { span: 24 },
		        sm: { span: 6 },
		    },
	        wrapperCol: {
		        xs: { span: 24 },
		        sm: { span: 18 },
	      	},
	    }
		return (
			<Form>
				{items.map((item,index)=>
					<FormItem key={index} {...formItemLayout} label={item.title}>
						{this.renderFormItemType(item,initData)}
					</FormItem>
				)}
			</Form>
		)
	}
	handleSubmit(){
		const { form,handleModalOK,formItems }=this.props

		form.validateFields((err, values) => {
			if(!err){
				let data={...values}
				//设置时间参数的格式
				formItems.map((item)=>{
					if(item.type==='datepicker' && data[item.dataIndex]){
						data[item.dataIndex]=data[item.dataIndex].format('YYYY-MM-DD HH:mm:ss')
					}
				})
				//提交参数
				handleModalOK(data)
			}
		})

	}

	render(){
		const {formItems,initData}=this.props

		return (
			<Modal
				{...this.props}
				className='modal'
	      		okText='确定'
	      		onOk={this.handleSubmit.bind(this)}
	      		cancelText='取消'
	      		maskClosable={false}
			>
				{this.renderFormItems(formItems,initData)}
			</Modal>
		)
	}
}

export default Form.create()(ModalBarForm) 