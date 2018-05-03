import React, { Component } from 'react'
import DynamiTable from "../../components/DynamiTable";
import "./SysManage.less"
import api from '../../api/api';
import FormBar from '../../components/FormBar';
import { message } from 'antd'

class Webside extends Component {
	state = {
		columns: [],
		dataList: [],
		formItems:[],
		tableLoading: true,
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
		let res = await api.getHeader('xinzhandian');
		let formItems = res.content;
		console.log(formItems)
		this.setState({ formItems });
	}

	getFormHeader = async () => {
		let res = await api.getFormHeader('zhandianliebiao');
		let columns = res.contents.form;
		let selectModel = res.contents.selectModel;
		this.setState({ columns, selectModel })
	}


	/**
	 * 获取列表
	 * 
	 * @param {any} pageNum 
	 * @memberof Webside
	 */
	getList = async (pageNum) => {
		pageNum = pageNum || this.state.page.page;;
		let res = await api.getListSite(pageNum);
		let dataList = [];
		if (res.code === 200) {
			dataList = res.content.list.slice();
			delete res.content.list
			let page = Object.assign(this.state.page, res.content);
			dataList.map((item, i) => 
				item.xuhao = i + 1 + this.state.page.pageSize * (this.state.page.page - 1)
			)
			this.setState({ dataList, tableLoading: false ,page})
		} else {
			this.setState({ dataList, tableLoading: false })
		}
	}


	addSite = (e) => {
		this.form.validateFields(async (err, values) => {
			console.log(values)
			const res = await api.insertSite(values);
			if(res){
				message.success("添加成功");
				this.getList();
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
				console.log(values)
				if (flag) {
					values.side_id = values.site_name;
					delete values.site_name
					let res = await api.updateSite(e.site_id, values);
					if (res.code === 200) {
						message.success('修改成功');
						this.getList();
					}
				}
			}
		})
	}
	del = async (record) => {
		const res = await api.deleteSite(record.site_id);
		if (res) {
			message.success("删除成功");
			this.getList();
		}
	}

	upFormBarData = () => {
		let dataList = this.state.dataList;
		console.log(dataList)
		this.setState({ dataList })
	}
	render() {
		return (
			<div>
				<div className="subTit">新站点</div>
				<div className="shadowBox">
					<FormBar
						ref={form => this.form = form}
						layout='inline'
						upData={this.upFormBarData}
						formItems={this.state.formItems}
						formBtnInline={[
							{ text: '添加', handleClick: this.addSite.bind(this) }
						]}
					/>
				</div>

				<div className="subTit">站点列表</div>
				<div className="shadowBox">
					<DynamiTable
						ref={table => this.table = table}
						columns={this.state.columns}
						dataSource={this.state.dataList}
						bordered
						loading={this.state.tableLoading}
						size="middle"
						handleModalEdit={this.handleModalEdit}
						del={this.del}
						pagination={this.state.page}
					/>
				</div>


			</div>
		)
	}
}

export default Webside