
import React, { Component } from 'react'
import FormBar from "../../components/FormBar";
import "./SysManage.less"
import api from '../../api/api';
import { message } from "antd";

class PathwayPermission extends Component {
	state = {
		formItems: [],
	};

	componentWillMount() {
		this.getHeader();
	}

	getHeader = async () => {
		let res = await api.getHeader('lujingdianquanxianguanli');
		let formItems = res.content;
		console.log(formItems)
		this.setState({ formItems });
	}

	site_id_cb = (e) => {
		console.log(e, 'site_id_cb');
		console.log(this.state.formItems)
		let formItems = this.state.formItems.slice();
		formItems.map((item) => {
			if (item.dataIndex === 'storage_room_id') {
				item.url = item.url.split("site_id=")[0] + "site_id=" + e;
				item.options = [];
			}
			return true;
		})
		this.form.resetFields('storage_room_id');
		this.form.resetFields('path_point_id');
		this.setState({formItems})
	}

	storage_room_id_cb = async(e) =>{
		let res = await api.axios('get','/pathPointStorageRoomAuthority/getPathRoomSimple?storage_room_id='+e);
		console.log(res)
		if(res.code === 200){
			let formItems = this.state.formItems.slice();
			formItems.map((item) => {
				if (item.dataIndex === 'path_point_id') {
					let a = res.content;
					let arr = [],ar=[];
					a.map((i,idx) => {
						let obj = {
							value:i.path_point_id,
							label:i.path_point_name,
						};
						arr.push(obj);
						if(i.state === true){
							ar.push(i.path_point_id)
						}
						return true;
					})
					item.options = arr;
					item.config.initialValue = ar;
				}
				return true;
			})
			this.form.resetFields('path_point_id');
			this.setState({formItems})
		}
	}
	handleFormSubmit(e) {
		e.preventDefault()
		this.form.validateFields(async (err, values) => {
			if (!err) {
				console.log(values)
				let data={path_point_id:values.path_point_name}
				let res = await api.updateUserStorageRoomAuthority(values.storage_room_id,data);
				if (res.code === 200) {
					message.success('修改成功');
				}
			}
		})
	}

	render() {
		return (
			<div>
				<div className="subTit">修改路径第库房权限</div>
				<div className='shadowBox'>
					<FormBar
						ref={form => this.form = form}
						formItems={this.state.formItems}
						site_id_cb={this.site_id_cb}
						storage_room_id_cb = {this.storage_room_id_cb}
						formBtns={[
							{ text: '修改', handleClick: this.handleFormSubmit.bind(this) }
						]}
					/>
				</div>
			</div>
		)
	}
}

export default PathwayPermission