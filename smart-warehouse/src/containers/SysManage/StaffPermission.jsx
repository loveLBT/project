import React, { Component } from 'react'
import FormBar from "../../components/FormBar";
import "./SysManage.less"
import api from '../../api/api';
import { message } from "antd";

class StaffPermission extends Component {
	state = {
		formItems: [],
	};

	componentWillMount() {
		this.getHeader();
	}

	getHeader = async () => {
		let res = await api.getHeader('kufangquanxianguanli');
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
			if (item.dataIndex === 'uname') {
				item.options = [];
			}
			return true;
		})
		this.form.resetFields('storage_room_id');
		this.form.resetFields('uname');
		this.setState({formItems})
	}

	storage_room_id_cb = async(e) =>{
		let res = await api.axios('get','/userStorageRoomAuthority/getListUserRoomSimple?storage_room_id='+e);
		console.log(res)
		if(res.code === 200){
			let formItems = this.state.formItems.slice();
			formItems.map((item) => {
				if (item.dataIndex === 'uname') {
					let a = res.content;
					let arr = [],ar=[];
					a.map((i,idx) => {
						let obj = {
							value:i.uid +"",
							label:i.uname,
						};
						arr.push(obj);
						if(i.state === true){
							ar.push(i.uid+"")
						}
						return true;
					})
					item.options = arr;
					item.config.initialValue = ar;
				}
				return true;
			})
			this.form.resetFields('uname');
			this.setState({formItems})
		}
	}

	handleFormSubmit(e) {
		e.preventDefault()
		this.form.validateFields(async (err, values) => {
			console.log(values)
			if (!err) {
				let data={uid:values.uname.slice()}
				data.uid.map((item,i) => data.uid[i] = item-0)
				console.log(data)
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
				<div className="subTit">人员库房权限</div>
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

export default StaffPermission