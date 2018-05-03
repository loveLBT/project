import React, { Component } from 'react'
import FormBar from "../../components/FormBar";
import DynamiTable from "../../components/DynamiTable";
import "./SysManage.less"
import api from '../../api/api';
import { message } from "antd";

class PathwayManage extends Component {
	state = {
		dataList: [],
		formItems: [],
		tableLoading: true,
		columns: [],
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
		let res = await api.getHeader('tianjialujingdian');
		let formItems = res.content;
		console.log(formItems)
		this.setState({ formItems });
	}

	getList = async (pageNum) => {
		pageNum = pageNum || this.state.page.page;;
		let res = await api.getPathPointDatail(pageNum);
		let dataList = [];
		if (res.code === 200) {
			dataList = res.content.list.slice();
			console.log(dataList)
			delete res.content.list
			let page = Object.assign(this.state.page, res.content);
			dataList.map((item, i) => {
				item.indoor_span = item.indoor ? "室内" : '室外';
				item.exit_span = item.exit ? "是" : '否';
				item.xuhao = i + 1 + this.state.page.pageSize * (this.state.page.page - 1)
				return true;
			})
			this.setState({ dataList, tableLoading: false ,page})
		} else {
			this.setState({ dataList, tableLoading: false })
		}
	}

	getFormHeader = async () => {
		let res = await api.getFormHeader('lujingdianliebiao');
		let columns = res.contents.form;
		let selectModel = res.contents.selectModel;
		this.setState({ columns, selectModel })
	}

	handleFormSubmit(e) {
		e.preventDefault()
		this.form.validateFields(async (err, values) => {
			if (!err) {
				console.log(values)
				let res = await api.insertUser_user(values);
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
				values.indoor = values.indoor === true  ? true : false; 
				let flag = false;
				for (let k in values) {
					let ele = values[k];
					if (e.hasOwnProperty(k) && e[k] !== ele) {
						flag = true;
						break;
					}
				}
				if (flag) {
					let res = await api.updatePathPoint(e.path_point_id, values);
					if (res.code === 200) {
						message.success('修改成功');
						this.getList();
					}
				}
			}
		})
	}

	del = async (recode) => {
		let res = await api.deleteUser_user(recode.uid);
		if (res.code === 200) {
			message.success('删除成功');
			this.getList();
		}
	}

	render() {
		return (
			<div>
				<div className="subTit">添加路径点</div>
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

				<div className="subTit">路径点列表</div>
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

export default PathwayManage
