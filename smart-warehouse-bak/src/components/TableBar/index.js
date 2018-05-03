import React,{ Component } from 'react'
import { Table,Icon,Popconfirm } from 'antd'
import classnames from 'classnames'
import _ from 'lodash'

import './style.css'
import ModalBar from '../ModalBar'
import FormBar from '../FormBar'

class TableBar extends Component {
	static defaultProps={
		columns:[],
		dataSource:[],
		className:'table',
		rowClassName:'row',
		bordered:true,
		size:'default',
		showNumColumn:false,//加载编号一列，默认不加载
		defaultActionColumns:false//加载操作一列，默认不加载
	}

	constructor(props) {
	  	super(props)
	
		this.state = {
	  	    modalVisible:false,
	  	    modalTitle:'',
	  	    modalIndex:0,//modal类型（1：表单类型 2：详情类型）
	  	    modalData:{}//modal的数据
	 	}
	}
	//点击编辑事件
	handleEditClick(record,index,){
		const { dataSource }=this.props

		this.setState({
			modalIndex:1,
			modalVisible:true,
			modalTitle:'编辑',
			modalData:dataSource[index]
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
	//modal框取消事件
	handleModalCancel(){
		this.setState({
			modalIndex:0,
			modalTitle:'',
			modalVisible:false,
			modalData:{}
		})
	}
	render(){
		const { columns,dataSource,className,defaultExpandAllRows,showNumColumn,defaultActionColumns,formInitData }=this.props
		const { modalIndex,modalTitle,modalVisible,modalData }=this.state
		//过滤表格数据源
		const filterDataSource=()=>{
			let newDataSource=_.cloneDeep(dataSource)

			newDataSource.map((data)=>{

				columns.map((col)=>{

					switch(col.type) {
						case 'select':
							return data[col.dataIndex]=data[col.nameIndex]
							break
						case 'image':
							return data[col.dataIndex]=<div className='td_img'><img src={data[col.dataIndex]} /></div>
						default :
							return data
					}

				})
			})

			return newDataSource
		}
		//过滤表格列数据
		const filterColumns=()=>{
			let newColumns=[...columns]

			if(showNumColumn){
				const numColumn={
					title:'编号',
					key:'num',
					render:(record,arg2,index)=>index+1
				}
				newColumns=[numColumn,...newColumns]
			}
			if(defaultActionColumns){

				const actionColumn={
					title:'操作',
					key:'action',
					render:(text, record, index)=>(
						<div className='action_column'>
							{ defaultActionColumns.handleModalSubmit &&
								<a onClick={this.handleEditClick.bind(this,record,index)} className='edit' href='javascript:;'>
									<Icon type='edit' />
								</a>
							}
							{ defaultActionColumns.handleTableRowDelete &&
								<Popconfirm 
									title='你确定删除该条数据吗？' 
									onConfirm={defaultActionColumns.handleTableRowDelete.bind(this,record)}  
									okText='确认' 
									cancelText='取消'
								>
									<a className='delete' href='javascript:;'>
										<Icon type='delete' />
									</a>
								</Popconfirm>
								
							}
						</div>
					)
				}

				newColumns=[...newColumns,actionColumn]
			}

			return newColumns
		}

		return (
			<div>
				<Table 
					{...this.props}
					dataSource={filterDataSource()}
					columns={filterColumns()}
					className={classnames(className,{expanded_row:defaultExpandAllRows})}
					rowClassName={(record,index)=>classnames('row',{doubleRowBgColor:index%2===0})}
					rowKey={(record,index)=>index}
					onRow={(record)=>({
						onDoubleClick:()=>this.handleDetailClick(record)
					})}
				/>
				{modalIndex===1 && 
					<ModalBar.Children 
						title={modalTitle}
						visible={modalVisible}
						onOk={defaultActionColumns.handleModalSubmit.bind(this)}
						onCancel={this.handleModalCancel.bind(this)}
					>
						<FormBar 
							ref={form=>this.form=form}
							formItems={columns}
							formData={modalData}
							initData={formInitData}
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
			</div>
		)
	}
}

export default TableBar