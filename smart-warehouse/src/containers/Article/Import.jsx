import React,{ Component } from 'react'
import DynamiTable from "../../components/DynamiTable";
import {Upload, Button } from "antd";
import api from '../../api/api';


class Import extends Component {
	state={
		show:false,
		dataList:[],
		page: {
			showQuickJumper: true,
			page: 1,
			pageSize:999,
		}
	}
	importExcel(e){
		console.log(e);
	}
	componentWillMount(){
		this.getFormHeader();
	}
	getFormHeader = async () => {
		let res = await api.getFormHeader('piliangdaoruwupin');
		let columns = res.contents.form;
		let selectModel = res.contents.selectModel;
		this.setState({ columns, selectModel })
	}

	render(){
		const props = {
			action: '/tool/previewToolList',
			listType: 'excel',
			withCredentials:true,
			onChange:(e) => {
				let dataList = [];
				if(e.file.response && e.file.response.code === 200){
					dataList = e.file.response.content.slice();
					this.setState({dataList,show:true})
				}
			}
		};
		return (
			<div>
				<div className="subTit clearfix">
					<div className="fl" style={{lineHeight:'36px'}}>导入物品</div>
						<Upload {...props} className="fl">
						<Button className="imports" type="primary" >导入文件</Button>
						</Upload>
				</div>
				<div className={'shadowBox '+ (this.state.show ? '' : 'hide')} >
					<DynamiTable
						columns={this.state.columns}
						dataSource={this.state.dataList}
						size="middle"
						loading={false}
						pagination={this.state.page}
					/>
				</div>
			</div>
		)
	}
}

export default Import