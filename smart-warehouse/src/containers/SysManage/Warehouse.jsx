
import React,{ Component } from 'react'
import FormBar from "../../components/FormBar";
import DynamiTable from "../../components/DynamiTable";
import "./SysManage.less"
import api from '../../api/api';
import { message } from "antd";



class Warehouse extends Component {
	state = {
		columns: [],
		formItems: [],
		dataList: [],
		selectModel:{},
		tableLoading:true,
		page: {
			showQuickJumper: true,
			page: 1,
			onChange: (page) => {
				this.getList(page);
			},
			total: 0,
		}
	};

	componentWillMount(){
		this.getFormHeader();
		this.getHeader();
		this.getList();
	}

	getHeader = async () => {
		let res = await api.getHeader('xinzengkufang');
		let formItems = res.content;
		this.setState({ formItems });
	}

	getFormHeader = async () => {
		let res = await api.getFormHeader('kufangliebiao');
		let columns = res.contents.form;
		let selectModel = res.contents.selectModel;
		this.setState({ columns ,selectModel})
	}

	getList =async (pageNum) => {
		pageNum = pageNum || 1;
		this.setState({ tableLoading: true })
		const res = await api.getStorageRoomList(pageNum);
		if(res.code === 200 ){
			let dataList = res.content.list.slice();
			delete res.content.list
			let page = Object.assign(this.state.page, res.content);
			dataList.map((item, index) => item.xuhao = index + 1 + this.state.page.pageSize * (this.state.page.page - 1));
			this.setState({ dataList, tableLoading: false, page });
		}
	}

	handleModalEdit = (e) => {
		console.log(e);
		this.table.form.validateFields(async (err, values) => {
			if (!err) {
				console.log(values)
				let res = await api.updateStorageRoom(values.storage_room_id,values);
				if(res.code === 200){
					message.success('修改成功');
					this.getList();
				}
			}
		})
	}
	
	handleFormSubmit = (e) => {
		e.preventDefault()
		this.form.validateFields(async (err, values) => {
			if (!err) {
				console.log(values)
				let res = await api.insertStorageRoom(values);
				if (res.code === 200) {
					message.success('添加成功');
					this.form.resetFields();
					this.getList();
				}
			}
		})
	}
	edit = (id) => {
		console.log(1);
	}

	del = (id) => {
		let dataList = this.state.dataList.slice();
		dataList.splice(dataList.findIndex(item => item.side_id === id),1)
		this.setState({dataList});
	}
	render(){

		return (
			<div>
				<div className="subTit">添加库房</div>
				<div className='shadowBox'>
					<FormBar
						ref={form => this.form = form}
						layout='inline'
						formItems={this.state.formItems}
						formBtns={[
							{ text: '添加', handleClick: this.handleFormSubmit.bind(this) }
						]}
					/>
				</div>

				<div className="subTit">库房列表</div>
				<div className="shadowBox">
				<DynamiTable
						ref={table => this.table = table}
						columns={this.state.columns}
						selectModel={this.state.selectModel}
						dataSource={this.state.dataList}
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

export default Warehouse