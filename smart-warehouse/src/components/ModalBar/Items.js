import React from 'react'
import { Modal,Row,Col } from 'antd'

const Detail=(props)=>{
	const { modalItems,modalData }=props 

	const renderModalItems=()=>{
		return modalItems.map((item,index)=>{
			return (
				<Row key={index}>
		   			<Col style={{textAlign:'right'}} span={7}>{item.title}：</Col>
		   			<Col span={17} >{modalData[item.dataIndex]}</Col>
		   		</Row>
			)
		})
	} 

	return (
		<Modal
			{...props}
		>
			{renderModalItems()}
		</Modal>
	)
}

Detail.defaultProps={
	footer:null,
	modalItems:[],
	modalData:{}
}

export default Detail