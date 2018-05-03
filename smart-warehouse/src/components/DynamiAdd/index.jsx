import React,{ Component } from 'react'
import { Select,Button,Input} from 'antd'

import './style.less'
const Option = Select.Option;
export default class DynamiAdd extends Component {
	static defaultProps={
		btnEvent:Function,
		btnText:String,
		datas:[], // name  placeholder ref mast dataList value,
		upData:{},
	}
	upData = {};
	componentDidMount(){
		let upData = {};
		console.log(this.props);
		if(this.props)
		this.props.datas.map(item => upData[item.ref] = item.value)
		this.upData = upData;
		console.log(this);
	}
	btnEvent = (e) => {
		this.props.btnEvent(this.upData);
	}

	selectChagne = (e,obj) => {
		let t = obj.key.split("_")[0];
		this.upData[t] = e;
	}
	change = (e) =>{
		let t = e.target;
		this.upData[t.name] = t.value;
	}
	render(){
		console.log(	this.props.datas);
		return (
			<div className="shadowBox clearfix" style={{paddingTop:"8px"}}>
				{
					this.props.datas.map((item,index) => {
						return <div className="fl box"  key={"item_"+index}>
						<div className="fl width6font" >{item.name} {item.mast ? <span className="red" >*</span> : "" }</div>
						{
							item.dataList ?
							<Select 
								className="fl full"
								name={`${item.ref}`}
								defaultValue={item.value ? item.value : `--${item.placeholder}--`}
								onChange={this.selectChagne}
								>
								{item.dataList.map((i,idx) => {
									return <Option key={item.ref+"_"+idx} value={i.value}>{i.text}</Option>
								})}
							</Select> :
							<Input name={`${item.ref}`} className="fl full" placeholder={item.placeholder}  defaultValue={item.value} onChange={this.change} />
						}
						</div>
					})
				}
				<Button style={{marginTop:"8px"}} className="changeBtn fl" onClick={this.btnEvent} >{this.props.btnText}</Button>
			</div>
		)
	}
}
