
import React, { Component } from 'react'
import { Button } from "antd";
import moment from 'moment';
import api from '../../api/api'
import { message } from "antd";


import FormBar from "../../components/FormBar";
import DynamiTable from "../../components/DynamiTable";


const dateFormat = 'YYYY-MM-DD';

// const Option = Select.Option;

class Received extends Component {
	state = {
		dataList: [],
		formItems: [],
		tableLoading: false,
		columns: [],
		selectModel: {},
		page: {
			showQuickJumper: true,
			page: 1,
			pageSize:2,
			defaultPageSize:2,
			onChange: (page) => {
				this.getList(page);
			},
			total: 0,
		}
	};
	
	nowParme = {};

	exportExcel = async () =>{
		const res = await api.exportToolNotIn(this.nowParme)
		console.log(res);
	}


	componentWillMount() {
		this.getFormHeader();
		this.getHeader();
	}

	getHeader = async () => {
		let res = await api.getHeader('lingyongwupinchaxun');
		let formItems = res.content;
		console.log(formItems)
		this.setState({ formItems });
	}

	getList = async (pageNum) => {
		pageNum = pageNum ? this.state.page.page = pageNum :  this.state.page.page;
		let datas={} ;
		datas.pageNum = pageNum;
		datas.pageSize = this.state.page.pageSize;
		console.log(datas);
		
		if (this.form) {
			this.form.validateFields((err, values) => {
				datas = Object.assign(datas,values) ;
				this.nowParme = datas;
			})
		}
		console.log(datas);
		const res = await api.getListNotIn(datas)
			let dataList = [];
			dataList = res.content.list.slice();
			delete res.content.list
			let page = Object.assign(this.state.page, res.content);
			dataList.map((item, i) => {
				item.xuhao = i + 1 + this.state.page.pageSize * (this.state.page.page - 1)
				return true;
			})
			
			this.setState({ page,dataList, tableLoading: false});
			return true;
	}

	site_id_cb = (e) => {
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

	getFormHeader = async () => {
		let res = await api.getFormHeader('lingquliebiao');
		let columns = res.contents.form;
		let selectModel = res.contents.selectModel;
		this.setState({ columns, selectModel })
	}

	async handleFormSubmit(e) {
		e.preventDefault()
		if(await this.getList(1)){
			message.success("查询成功")
		}
	}


	render() {
		// const { match }=this.props
		let p = {};
		p.style = { width: "100%" }
		p.placeholder = "截止"
		if (true) {
			p.defaultValue = moment('2015-01-01', dateFormat)
		}
		p.onChange = this.onStartChange
		p.disabledDate = this.disabledStartDate
		return (
			<div>
				<div className="subTit">选择库房</div>
				<div className='shadowBox'>
					<FormBar
						ref={form => this.form = form}
						formItems={this.state.formItems}
						layout='inline'
						site_id_cb={this.site_id_cb}
						formBtnInline={[
							{ text: '查询', handleClick: this.handleFormSubmit.bind(this) }
						]}
					/>
				</div>

				<div className="subTit">物品日志列表
					<Button className="exprots" type="primary" onClick={this.exportExcel} >导出</Button>
				</div>
				<div className="tableBox">
					<DynamiTable
						columns={this.state.columns}
						dataSource={this.state.dataList}
						size="middle"
						loading={this.state.tableLoading}
						pagination={this.state.page}
					/>
				</div>
			</div>
		)
	}
}

export default Received
