
import React, { Component } from 'react'
import _ from 'lodash'
import axios from 'axios'
import objectAssign from 'object-assign'
import FormBar from "../../components/FormBar";
import DynamiTable from "../../components/DynamiTable";
import api from '../../api/api';
import { message } from "antd";

class DeviceTypeManage extends Component {
	state = {
		dataList: [],
		formItems: [],
		tableLoading: true,
		columns: [],
		baofei_no:[],
		baofei:[],
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
		let res = await api.getHeader('tianjiawupin');
		let res2 =await api.getHeader('baofeiform')
		let formItems = res.content;
		
		this.setState({ formItems,baofei_no:res2.content,baofei: res2.content});
	}

	getList = async (pageNum) => {
		pageNum = pageNum || this.state.page.page;;
		let res = await api.getListToolList(pageNum);

		let dataList = [];
		
		if (res.code === 200) {
			dataList = res.content.list.slice();
			delete res.content.list
			let page = Object.assign(this.state.page, res.content);
			dataList.map((item, i) => {
				item.xuhao = i + 1 + this.state.page.pageSize * (this.state.page.page - 1);
				item.t_state = item.t_state === 1 ? true : false;
				item.t_state_span = item.t_state ? '在库' : '不在';
				return true;
			})
			this.setState({ dataList, tableLoading: false ,page})
		} else {
			this.setState({ dataList, tableLoading: false })
		}
	}

	getFormHeader = async () => {
		let res = await api.getFormHeader('wupinliebiao');
		let columns = res.contents.form;
		let selectModel = res.contents.selectModel;
		this.setState({ columns, selectModel })
	}

	handleFormSubmit(e) {
		e.preventDefault()
		this.form.validateFields(async (err, values) => {
			if (!err) {

				let res = await api.insertTool(values);
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
				let res = await api.updateTool(e.tool_id, values);
				console.log(values)
				if (res.code === 200) {
					message.success('修改成功');
					this.getList();
				}
			}
		})
	}
	//所属站点与所在库房的联动选择
	site_id_cb=async (e)=>{
		let formItems = this.state.formItems.slice();
		formItems.map((item) => {
			if (item.dataIndex === 'storage_room_id') {
				item.url = item.url.split("site_id=")[0] + "site_id=" + e;
				item.options = [];
			}
			return true;
		})
		this.form.resetFields('storage_room_id');
		this.setState({formItems})
	}
	//是否可用与报废时间和报废图片进行联动
	scrap_state_cb=async (e) =>{
		const { baofei_no }=this.state
		let newBaofei=[]
		if(e!=='1'){
			newBaofei=_.differenceBy(baofei_no,[{dataIndex:'scrap_time'},{dataIndex:'scrap_photo'}],'dataIndex')
			
			this.setState({
				baofei:newBaofei
			})
		}else{
			this.setState({
				baofei:baofei_no
			})
		}
	}
	//是否可用与报废时间和报废图片进行联动
	site_id_cb2=async (e,isEdit) =>{
		const {selectModel}=this.state
		const res=await axios.get('/storageRoom/getListStorageRoomName?site_id='+e)
		const storage_room_id=res.content

		if(!isEdit){
			this.table.form.setFieldsValue({storage_room_id:null})
		}

		this.setState({
			selectModel:objectAssign({},selectModel,{storage_room_id})
		})

	}
	//编辑按钮
	edit=(record)=>{
		this.scrap_state_cb(record.scrap_state)
		this.site_id_cb2(record.site_id,true)
	}
	del = async (recode) => {
		let res = await api.deleteTool(recode.tool_type_id);
		if (res.code === 200) {
			message.success('删除成功');
			this.getList();
		}
	}
	

	render() {
		const select_cb={
			scrap_state_cb:this.scrap_state_cb.bind(this),
			site_id_cb:this.site_id_cb2.bind(this)
		}

		return (
			<div>
				<div className="subTit">添加物品</div>
				<div className='shadowBox'>
					<FormBar
						ref={form => this.form = form}
						formItems={this.state.formItems}
						layout='inline'
						formBtns={[
							{ text: '添加', handleClick: this.handleFormSubmit.bind(this) }
						]}
						site_id_cb={this.site_id_cb.bind(this)}
					/>
				</div>

				<div className="subTit">物品列表</div>
				<div className="shadowBox">
					<DynamiTable
						ref={table => this.table = table}
						columns={this.state.columns}
						modalFormData={this.state.baofei}
						dataSource={this.state.dataList}
						selectModel={this.state.selectModel}
						del={this.del}
						edit={this.edit.bind(this)}
						handleModalEdit={this.handleModalEdit}
						bordered
						loading={this.state.tableLoading}
						size="middle" 
						select_cb={select_cb}
					/>

				</div>
			</div>
		)
	}
}

export default DeviceTypeManage
