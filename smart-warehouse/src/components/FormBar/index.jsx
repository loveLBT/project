import React from 'react'
import { Form, Row, Col, Select, Checkbox, Input, Button, DatePicker, InputNumber, Spin, Upload, Icon, Switch } from 'antd'
import objectAssign from 'object-assign'
import moment from 'moment'

import './style.less'
import api from '../../api/api';

const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group;
const Option = Select.Option

class FormBarClass extends React.Component {
	dateFormat = 'YYYY-MM-DD hh:mm:ss';
	state = {
		fileList:{}
	}
	checkHandle = (e, select) => {
		console.log(e, this)
		return
	}

	timeHandle = (e, d) => {
		this[d] = e.valueOf();
		console.log(this);
	}
	disabledStartDate = (startValue) => {
		const endValue = this.end_time;
		if (!startValue || !endValue) {
			return false;
		}
		return startValue > endValue;
	}

	disabledEndDate = (endValue) => {
		const startValue = this.start_time;
		if (!endValue || !startValue) {
			return false;
		}
		return endValue <= startValue
	}

	upData() {
		let { formItems } = this.props
		this.setState({ formItems })
	}


	renderFormItemType = (item, index) => {
		const { form } = this.props
		const { getFieldDecorator } = form;
		switch (item.type) {
			case 'select':
				const options = item.options ? item.options : [];
				let getList = async (e) => {
					if (item.url) {
						let data = await api.axios('get', item.url);
						item.options = data.content;
						this.upData();
					}
				}
				return (
					// <SelfSelect item={item}/>
					<Select
						disabled={item.disabled}
						showSearch
						optionFilterProp='children'
						notFoundContent={options.length === false ? <Spin size="small" /> : null}
						onFocus={(e) => {
							if (options.length === 0) getList(index);
						}}
						onChange={ (e) => {
							if(this.props[item.dataIndex+"_cb"]){
								this.props[item.dataIndex+"_cb"](e);
							}
						} }
						placeholder={`请选择${item.title}`}>
						{options.map((item) =>
							<Option key={item.value} value={item.value + ""}>{item.text}</Option>
						)}
					</Select>
				)

			case 'boolean':
				return (
					<Switch disabled={item.disabled} />
				)
			case 'checkbox':
				let op = item.options;
				return (
					<CheckboxGroup
						disabled={item.disabled}
						options={op}
					/>
				)
			
			// case 'checkAll':
			// let ops = item.options;
			// return (
			// 	<div>
			// 		<Checkbox
			// 			indeterminate={this.state.indeterminate}
			// 			onChange={this.onCheckAllChange}
			// 			checked={this.state.checkAll}
			// 		>
			// 			全选
			// 		</Checkbox>
			// 		<CheckboxGroup
			// 			disabled={item.disabled}
			// 			options={op}
			// 			/>
			// 	</div>
			// )

			case 'checkInput':
				let option = item.options;
				return (<CheckboxGroup className="clearfix" disabled={item.disabled}>
					{option.map((e, i) => {
						let style = { marginRight: 8, float: "left", lineHeight: "40px" };
						return <div key={i}>
							<Checkbox style={style} value={e.value}   >
								{e.label}
							</Checkbox>
							<FormItem style={{ float: 'left', width: '60%' }}>
								{getFieldDecorator(item.dataIndex + "_" + e.value, { initialValue: e.num })(
									<InputNumber style={{ width: '50%', margin: '0 10px' }} />
								)}
								{e.uitl}
							</FormItem>
						</div>
					})}
				</CheckboxGroup>)

				case 'checkData':
				let checkDataop = item.options;
				return (<CheckboxGroup className="clearfix" disabled={item.disabled}>
					{checkDataop.map((e, i) => {
						let p ={};
						p.onChange = (eve) => { this.timeHandle(eve, e.dataIndex) };
						p.disabledDate = e.dataIndex === 'start_time' ? this.disabledStartDate : this.disabledEndDate;
						let style = { marginRight: 8, float: "left", lineHeight: "40px" };
						return <div key={i} className="clearfix" >
							<Checkbox style={style} value={e.value}   >
								{e.label}
							</Checkbox>
							<FormItem style={{ float: 'left', width: '60%' }}>
								{getFieldDecorator(e.dataIndex)(
									<DatePicker {...p} style={{ width: '50%', margin: '0 10px' }} />
								)}
								{e.uitl}
							</FormItem>
						</div>
					})}
				</CheckboxGroup>)

			case 'time':
				let p = {};
				p.style = { width: "100%" }
				if(item.config){
					if (item.config.initialValue) {
						let t = new Date(item.config.initialValue);
						let time = `${t.getFullYear()}-${t.getMonth() + 1}-${t.getDate()}`;
						item.config.initialValue = moment(time, this.dateFormat);
					} else {
						delete item.config.initialValue;
					}
				}

				p.onChange = (e) => { this.timeHandle(e, item.dataIndex) };
				p.disabledDate = item.dataIndex === 'start_time' ? this.disabledStartDate : this.disabledEndDate;
				return (<DatePicker
					placeholder={"请选择时间"}
					disabled={item.disabled}
					{...p}
				/>);
				
			case 'upImg':
				const fileList = this.state.fileList;
				fileList[item.dataIndex] = item.FileList ? item.FileList.slice() :[];
				let props = {
					action:'/image/uploadImg',
					listType: 'picture',
					defaultFileList: item.FileList || [],
					onChange(e){
						if(e.file.response && e.file.response.code === 200){
							item.data = e.file.response.content;
							let max = item.max || 1;
							if(e.fileList.length > max){
								e.fileList = e.fileList.splice(0,e.fileList.length - max);
							}
						}
					},
				};
				if(!item.config){
					let config = {};
					config.getValueFromEvent = (e)=>{
						return item.data;
					}
					item.config = config;
					
				}else{
					if(!item.config.getValueFromEvent)
					item.config.getValueFromEvent = (e)=>{
						return item.data;
					}
				}
				return (<Upload {...props} name="imgFile"  disabled={item.disabled} >
					<Button>
						<Icon type="upload" />上传图片
				</Button>
				</Upload>)
			case 'number':
				return (
					<InputNumber disabled={item.disabled} min={1} placeholder={`请输入${item.title}`} />
				)
			default:
				return (
					<Input disabled={item.disabled} placeholder={`请输入${item.title}`} />
				)
		}
	}

	renderFormItems() {
		const { form, formItems, formData, layout } = this.props
		const colSpan = layout === 'inline' ? 8 : 24
		const { getFieldDecorator } = form;
		const formItemLayout = layout === 'inline' ? 
		{
			labelCol: {
				xs: { span: 24 },
				sm: { span: 8 },
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 16 },
			},
		}:{
			labelCol: {
				xs: { span: 24 },
				sm: { span: 8 },
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 12 },
			},
		};
		return formItems.map((item, index) => {
			// 先创建 jsx  因为 有些 初始化的属性会在创建的过程中改变
			let items = this.renderFormItemType(item);

			let config = objectAssign(
				{},
				item.config,
				formData[`${item.dataIndex}`] ? { initialValue: formData[`${item.dataIndex}`] } : null
			)

			switch (item.type) {
				case 'boolean':
					config.valuePropName = "checked"
					break;
				case 'select':
					config.initialValue = config.initialValue ? config.initialValue + "" :undefined;
					break;
				case 'time':
					config.initialValue= config.initialValue ? moment(config.initialValue) : moment();
					break;
				default:
					break;
			}

			return (
				<Col span={colSpan} key={index}>
					<FormItem {...formItemLayout} label={item.title}>
						{getFieldDecorator(item.dataIndex, config)(
							items
						)}
					</FormItem>
				</Col>
			)
		})
	}

	renderFormBtnInline = (item) => {
		const { layout, formBtnInline } = this.props
		const colSpan = layout === 'inline' ? 8 : 24

		if (formBtnInline)
			return formBtnInline.map((item, index) => {
				return (
					<Col span={colSpan} key={index}>
						<Button key={index} type="primary" onClick={item.handleClick}>{item.text}</Button>
					</Col>
				)
			})
	}

	render() {
		const { formBtns } = this.props

		return (
			<Form
				className='form'
				style={this.props.style}
			>

				<Row gutter={24}>
					{this.renderFormItems()}
					{this.renderFormBtnInline()}
				</Row>
				{formBtns &&
					<Row>
						<Col span={24} style={{ textAlign: 'right' }}>
							{formBtns.map((item, index) =>
								<Button key={index} type="primary" onClick={item.handleClick}>{item.text}</Button>
							)}
						</Col>
					</Row>
				}

			</Form>
		)
	}
}

const FormBar = Form.create()(FormBarClass);


FormBar.defaultProps = {
	formItems: [],
	formData: {},
	okText: '确定',
	layout: 'horizontal',
	formBtns: null
}

export default FormBar
