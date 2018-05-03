
import React, { Component } from 'react'
import FormBar from "../../components/FormBar";
import DynamiTable from "../../components/DynamiTable";
import api from '../../api/api';
import { message } from "antd";

class Add extends Component {
	state = {
		dataList: [],
		formItems: [],
		tableLoading: true,
		columns: [],
		selectModel: {},
		page: {
			showQuickJumper: true,
			page: 1,
			pageSize:20,
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
		let res = await api.getHeader('shiyongdengji');
		let formItems = res.content;
		console.log(formItems)
		formItems.map((item) => 
			item.type === 'checkData' ? item.options = [
				{
					dataIndex:'start_time',
					label:'领取',
					value:0,
				},
				{
					dataIndex:'end_time',
					label:"归还",
					value:1,
				}
			]:""
		)
		this.setState({ formItems });
	}

	getList = async (pageNum) => {
		pageNum = pageNum ? this.state.page.page = pageNum : this.state.page.page;
		let res = await api.getListToolNotRegister(pageNum);
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
		let res = await api.getFormHeader('shebeileixing');
		let columns = res.contents.form;
		let selectModel = res.contents.selectModel;
		this.setState({ columns, selectModel })
	}

	handleFormSubmit(e) {
		e.preventDefault()
		this.form.validateFields(async (err, values) => {
			if (!err) {
				console.log(values)
				let res = await api.insertEquipmentType(values);
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
					let res = await api.updateEquipmentType(e.equipment_type_id, values);
					if (res.code === 200) {
						message.success('修改成功');
						this.getList();
					}
				}
			}
		})
	}


	del = async (recode) => {
		let res = await api.deleteEquipmentType(recode.equipment_type_id);
		if (res.code === 200) {
			message.success('删除成功');
			this.getList();
		}
	}
	
	render() {
		return (
			<div>
				<div className="subTit">使用登记</div>
				<div className='shadowBox'>
					<FormBar
						ref={form => this.form = form}
						formItems={this.state.formItems}
						formBtns={[
							{ text: '添加', handleClick: this.handleFormSubmit.bind(this) }
						]}
					/>
				</div>

				<div className="subTit">物品列表</div>
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

export default Add
