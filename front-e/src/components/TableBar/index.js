import React,{ Component } from 'react'
import { Table } from 'antd'
import moment from 'moment'

import './style.css'
import Footer from './Footer'

class TableBar extends Component{
	static defaultProps={
		className:'table',
		bordered:true,
		size:'small',
		rowClassName:false,
		sorter:false,
		rowSelect:false
	}
	constructor(props) {
	  	super(props)
	
		this.state = {
			scrollX:0,
			columns:[],
			dataSource:[],
			selectedRow:{}
	  	}
	}

	componentWillReceiveProps(nextProps){
		const { columns, dataSource, initData }=nextProps
		
		if(nextProps.dataSource!==this.props.dataSource){
			this.setDataSource(columns,dataSource,initData)
		}

		if(columns.length>0 && dataSource.length>0){
			this.setColumn(columns)
		}
	}
	//1.设置表格每列宽度 2.设置表格总宽度
	setColumn(columns){
		const { sorter }=this.props
		let newColums=[]
		let scrollX=0
		
		columns.map((col)=>{
			let newCol={...col}
			//增加表格排序
			if(sorter){
				newCol.sorter=(a,b)=>{
					if(a[newCol.dataIndex]){
						return a[newCol.dataIndex].localeCompare(b[newCol.dataIndex])
					}else{
						return 0
					}
					
				}
			}
			
		
			newCol.width=150
			newColums.push(newCol)
			scrollX+=150
		})
		
		this.setState({
			columns:newColums,
			scrollX
		})
	}
	//设置表格数据源
	setDataSource(columns,dataSource,initData){
		let newDataSource=[]

		dataSource.map((data)=>{
			let newData={...data}
			newData.key=data.id
			
			columns.map((col)=>{
				if(col.type==='select'){
					const options=initData[col.optionIndex]

					options.map((option)=>{
						if(option.value===newData[col.dataIndex]){
							newData[`${col.dataIndex}Index`]=option.value
							newData[col.dataIndex]=option.label
						}
					})
				}else if(col.type==='checkbox'){
					newData[`${col.dataIndex}Index`]=newData[col.dataIndex]
					newData[col.dataIndex]=newData[col.dataIndex]?'是':'否'
				}else if(col.type==='datepicker'){

					if(newData[col.dataIndex]){
						newData[`${col.dataIndex}Index`]=moment(newData[col.dataIndex])
					}
				}else if(col.type==='checkboxgroup'){
					let str=''
					newData[`${col.dataIndex}Index`]=newData[col.dataIndex]
					const options=initData[col.optionIndex]
					const values=newData[col.dataIndex]

					options.map((option)=>{
						values.map((value)=>{
							if(option.value===value){
								str+=`${option.label},`
							}
						})
					})

					newData[col.dataIndex]=str
				}else if(col.type==='upload'){
					let path=`${col.dataIndex}Path`
					let name=`${col.dataIndex}Name`
					let index=`${col.dataIndex}Index`

					newData[index]=newData[col.dataIndex]

					if(newData[col.dataIndex]){
						const pathArray=newData[path].split('/')
						
						newData[name]=pathArray[pathArray.length-1]
						newData[col.dataIndex]=<a href={data[path]} download={newData[name]} target="_blank">{newData[name]}</a>
					}

					

				}
			})
		
			newDataSource.push(newData)
		})
	
		this.setState({dataSource:newDataSource})
	}

	handleRowSelectionChange(selectedRowKeys, selectedRows){
		this.setState({
			selectedRow:selectedRows[0]
		})
	}
	
	//表格行的类名
	rowClassName(record){
		switch(record.VfState) {
			case '编辑中':
				return 'purple'
				break
			case '已执行':
				return 'transparent'
				break
			case '待执行':
				return 'yellow'
				break
			case '二次待执行':
				return 'blue'
				break
			default :
				return 'gray'
		}
	}

	render(){
		const { columns, dataSource, scrollX, selectedRow }=this.state
		const { footer,rowClassName,rowSelect }=this.props
		const rowSelection={
			type:'radio',
			onChange:this.handleRowSelectionChange.bind(this)
		}

		return (
			<Table 
				{...this.props}
				dataSource={dataSource}
				columns={columns}
				scroll={{ x: scrollX,y:420 }}
				footer={footer?
					()=><Footer data={footer} />:
					undefined
				}
				rowSelection={rowSelect?rowSelection:undefined}
				rowClassName={rowClassName?
					this.rowClassName.bind(this):
					undefined
				}
			/>
		)
	}
}

export default TableBar