import React,{ Component } from 'react'
import { Table,Button,Icon,Popconfirm,Modal} from 'antd'
import classnames from 'classnames'
import ModalBar from '../ModalBar'
import FormBar from '../FormBar'

import './style.less'

class DynamiTable extends Component {
	static defaultProps={
		columns:[],
		modalFormData:[],
		dataSource:[],
		selectModel:{},
		className:'',
		loading: true,
		rowClassName:'row',
		bordered:true,
		size:'default',
		select_cb:{},

		del:Function,
	}
	constructor(props){
		super(props)
		this.state = {
			modalVisible:false,
			modalTitle:'',
			modalIndex:0,//modal类型（1：表单类型 2：详情类型）
			modalData:{},//modal的数据,
			previewVisible: false,
			previewImg:'',
		}
	}

	//点击编辑事件
	handleEditClick(record,index,){
		if(this.props.edit){
			this.props.edit(record)
		}
		const { dataSource ,columns}=this.props;
		//  深拷贝
		let data = JSON.parse( JSON.stringify(dataSource[index]) )
		columns.map((item,i) => {
			if(item.type === 'select'){
				
				data[item.dataIndex] = data[item.dataIndex]+"";
			}
			return true;
		})
		this.setState({
			modalIndex:1,
			modalVisible:true,
			modalTitle:'编辑',
			modalData:data
		})
	}
	//双击表格行事件
	handleDetailClick(record){
		this.setState({
			modalIndex:2,
			modalVisible:true,
			modalTitle:'详情',
			modalData:record
		})
	}
	previewVisibleHandleCancel=(e)=>{
		this.setState({previewVisible:false,previewImg:''})
	}

	//modal框取消事件
	handleModalCancel(){
		this.setState({
			modalIndex:0,
			modalTitle:'',
			modalVisible:false,
			modalData:{}
		})
	}

	beforeRender(){
		const self = this;
		this.props.dataSource.map((item,idx)=>{
			item.key="table_"+idx;
			item.operate_id = item[item.same];
			return true;
		})
		this.props.columns.forEach((e,idx) => {
			e.disabled = e.notModify
			switch (e.type) {
				case 'operate':
					e.render = (text,record,index) => {
						return (
							[	<Button onClick={this.handleEditClick.bind(this,record,index)} icon="edit" key={"edit_"+e.key}></Button>,
								<Popconfirm 
									placement="top"
									title={"是否删除该条信息"}
									onConfirm={e => self.props.del(record)}
									key={"close_"+e.key}
									okText="确定" cancelText="取消">
										<Button icon="cross"></Button>
								</Popconfirm> ,
							]
						)
					}
					break;
				case 'color':
					e.render = (text,record,index) => {
						return (<span className={ record.color + " state" } >{text}</span>)
					}
					break;
				
				case 'select':
					e.options = this.props.selectModel[e.dataIndex];
					e.render = (text,record,index) => {
						let name = e.dataIndex.substr(0,e.dataIndex.lastIndexOf('_'))+"_name"
						return (record[name])
					}
					break;
				case 'boolean':
					e.render = (text,record,index) =>{
						return (<span className={ record.color + " state" } >{record[e.dataIndex+"_span"]}</span>)
					}
					break;
				case 'video':
					e.render = (text,record,index) => {
						return (
							<Button type="primary" onClick={ e => self.props.playVideo(text)}  >
								<Icon type="create-right" />播放
							</Button>
						)
					}
					break;
				case 'img':
					e.render = (text,record,index) => {
						return (
							<img src={text} key={1} className="midImg" alt="" onClick={(t) => {
								// console.log(e[e.dataIndex+'_err']);
								// console.log(e)
								if(!record[e.dataIndex+'_err']) this.setState({previewVisible:true,previewImg:text})
							}} onError={ (err)=>{
								console.log(e)
								record[e.dataIndex+'_err'] = true;
							}} />
						)
					}
					break;
				case 'group':
					e.render = (text,record,index) => {
						let arr = e.dataIndex.split("&");
						return (
							arr.map((t,i) => 
								<div key={i}>{record[t] || "无"}</div>
							)
						)
					}
					break
				default:
					break;
			}
		});
	}
	render(){
		const { columns,className,defaultExpandAllRows ,handleModalEdit,modalFormData}=this.props
		const { modalIndex,modalTitle,modalVisible,modalData }=this.state
		this.beforeRender();
		// 浅拷贝 一个 数组 防止被意外修改
		let canDo = columns.slice();

		for (let i = 0; i < canDo.length; i++) {
			let e = canDo[i];
			switch (e.type) {
				case 'img':
					e.type = 'upImg';
					break;
				case 'group':
					{
						let arr = e.dataIndex.split("&");
						let res = [];
						for (let j = 0; j < arr.length; j++) {
							let obj = {};
							obj.title = e.title.split('/')[j];
							obj.dataIndex = e.dataIndex.split("&")[j];
							obj.disabled = e.disabled;
							res.push( obj );
						}
						canDo.splice(i,1,...res);
					}
					i--;
					continue;
				case "operate":
				case "video":
				case "xuhao":
				canDo.splice(i,1);
				i--;
				continue;
				default: 
				break;
			}
			if(e.notModify){
				canDo.splice(i,1);
				i--;
			}
		}
		
		return (
			<div>

			<Table 
				{...this.props}
				
				className={classnames(className,{expanded_row:defaultExpandAllRows})}
				/>
				{modalIndex===1 && 
					<ModalBar.Children 
						title={modalTitle}
						visible={modalVisible}
						onOk={ e=>{handleModalEdit(modalData); this.handleModalCancel()}}
						onCancel={this.handleModalCancel.bind(this)}
					>
						<FormBar 
							ref={form=>this.form=form}
							formItems={[...canDo,...modalFormData]}
							formData={modalData}
							{...this.props.select_cb}
						/>
					</ModalBar.Children>

				}
				{modalIndex===2 && 
					<ModalBar.Items 
						title={modalTitle}
						visible={modalVisible}
						onCancel={this.handleModalCancel.bind(this)}
						modalItems={columns}
						modalData={modalData}
					/>
				}
				<Modal visible={this.state.previewVisible} footer={null} onCancel={this.previewVisibleHandleCancel}>
					<img alt="" style={{ width: '100%' }} src={this.state.previewImg} />
				</Modal>
			</div>
		)
	}
}

export default DynamiTable