import React,{Component} from 'react'
import { Modal,Row,Col } from 'antd'

class ModalBarDetail extends Component {
	static defaultProps={
		modalItems:[]		
	}
	renderModalItems(items){
		const {modalData}=this.props
	   	const labelCol={
	        xs: { span: 24 },
	        sm: { span: 8 },
	    }
        const wrapperCol={
	        xs: { span: 24 },
	        sm: { span: 16 },
      	}
      	return (
      		items.map((item,index)=>
  				<Row key={index}>
		   			<Col style={{textAlign:'right'}} {...labelCol}>{item.title}：</Col>
		   			<Col {...wrapperCol}>{modalData[item.dataIndex]}</Col>
		   		</Row>
  			)
      	)

	}
	render(){
		const {modalItems}=this.props

		return (
			<Modal
				{...this.props}
				className='modal'
	      		footer={null}
	      		maskClosable={false}
			>
				{this.renderModalItems(modalItems)}
			</Modal>
		)
	}
}

export default ModalBarDetail