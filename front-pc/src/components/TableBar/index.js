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
			selectedRow:{}
	  	}
	}
	
	//1.设置表格每列宽度 2.设置表格总宽度 3.增加表格排序
	setColumn(columns,dataSource){
		const { sorter }=this.props
		let newColums=[]
		let maxWidth=0
		
		columns.map((col)=>{
			let newCol={...col}
			let colLen=newCol.title.length+2
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
			
			//设置表格每列宽度
			dataSource.map((record)=>{
				
				if(record[col.dataIndex]){
					if(col.type==='upload'){
						if(record[`${col.dataIndex}Path`].length>colLen){
							colLen=record[`${col.dataIndex}Path`].length
						}
						
					}else{
						if(record[col.dataIndex].length>colLen){
							colLen=record[col.dataIndex].length
						}
						
					}
				}
			})

			if(colLen*15>300){
				newCol.width=300
			}else{
				newCol.width=colLen*15
			}

			newColums.push(newCol)
			maxWidth+=newCol.width
		})
		return {
			columns:newColums,
			maxWidth
		}
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
		return newDataSource
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
		const { footer,rowClassName,rowSelect,columns,dataSource,initData }=this.props
		const rowSelection={
			type:'radio',
			onChange:this.handleRowSelectionChange.bind(this)
		}
		const newDataSource=this.setDataSource(columns,dataSource,initData)
		
		const columnObj=this.setColumn(columns,newDataSource)

		return (
			<Table 
				{...this.props}
				dataSource={newDataSource}
				columns={columnObj.columns}
				scroll={{ x: columnObj.maxWidth,y:420 }}
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