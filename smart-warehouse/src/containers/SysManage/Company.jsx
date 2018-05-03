import React,{ Component } from 'react'
import FormBar from "../../components/FormBar";
import config from "../../config/barConfig"
import { message } from 'antd'

import "./SysManage.less"
import API from '../../api/api';

class Company extends Component {
	state = {
		datas:[{
			ref:"CompanyName",
			placeholder:"请输入公司名称",
			value:"",
			mast:true,
			name:"总公司名称"
		}]
	};
	handleFormSubmit(e) {
		e.preventDefault()
		this.form.validateFields( async (err, values) => {
			console.log(values);
			const res = await API.updateCompany(values.company_name);
			if(res.code === 200) message.success("修改成功");
		})
		
	}
	render(){
		console.log(1);
		return (
			<div>
				<div className="subTit">总公司管理</div>
					<div className="searchBox">
					<FormBar
							ref={form => this.form = form}
							layout='inline'
							formItems={config.CompanyName}
							formBtnInline={[
								{ text: '修改', handleClick: this.handleFormSubmit.bind(this) }
							]}
						/>
				</div>
			</div>
		)
	}
}

export default Company