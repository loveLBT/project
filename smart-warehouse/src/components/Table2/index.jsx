import React,{ Component } from 'react'
import { Table,Button,Icon,Popconfirm } from 'antd'
import classnames from 'classnames'
import ModalBar from '../ModalBar'
import FormBar from '../FormBar'

import './style.less'

class Table2 extends Component {
	static defaultProps={
		columns:[],
		dataSource:[],
		className:'',
		loading: true,
		rowClassName:'row',
		bordered:true,
		size:'default',
	}
	state={
		columns:[{
			title: '类别',
			dataIndex: 'type',
			render: (text, row, index) => {
				return {
					children: <img src={text} className="midImg" alt="" onClick={() => {
						if(self.props.openImg) self.props.openImg(record);
					} } />,
					props: {
						colSpan: 2,
						rowSpan: index % 2 == 0 ? 2: 0,
					},
				}
			},
		},{
			title:'name',
			dataIndex:'name',
			render:(text,row,index)=>{
				return {
					children:text,
					props: {
						colSpan: 0,
						rowSpan: index % 2 == 0 ? 1: 0,
					},
				}
			}
		}]
	}

	beforeRender(){
		const self = this;
		this.props.dataSource.map((item,idx)=>{
			item.key="table_"+idx;
			item.operate_id = item[item.same];
			return true;
		})
		this.props.columns.forEach((e,idx) => {

		});
	}
	render(){
		const { columns,className,defaultExpandAllRows,formInitData }=this.props
		let props = Object.assign({},this.props);
		delete props.columns;
		this.beforeRender();
		return (
			<div>
			<Table 
				{...props}
				className={classnames(className,{expanded_row:defaultExpandAllRows})}
				/>
			</div>
		)
	}
}

export default DynamiTable