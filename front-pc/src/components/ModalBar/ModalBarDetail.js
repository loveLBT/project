import React,{Component} from 'react'
import { Modal,Row,Col,message,Button } from 'antd'
import axios from 'axios'

class ModalBarDetail extends Component {
	static defaultProps={
		modalItems:[]		
	}
	constructor(props) {
	    super(props)
	
	    this.state = {
	    	isBtn:false
	    }
	}
	async handleReadClick(url,id){
		const type=url.split('.')[1]
		if(type!=='pdf'){
			//const newWin = window.open()
			const hide =message.loading('正在查找您的文件...', 0)
			this.setState({isBtn:true})
			const res=await axios.get(`/vo/file_preview/${id}`)//get.voFilePreview(id)

			if(res.code===200){
				const timer=setInterval(async ()=>{
					const pdf=await axios.get(res.url)

					if(pdf.status!=='0'){
						clearInterval(timer)

						if(pdf.status==='1'){
							Modal.success({
							    title: '查找成功',
							    content: '是否马上预览呢...',
							    okText:'是',
							    onOk:()=>{
							    	window.open(`${res.server}${pdf.URL}`)
							    }
							});
						}
						if(pdf.status==='2'){
							message.error('预览失败!')
						}
						setTimeout(hide, 0)
						this.setState({isBtn:false})
					}
				},1000)


			}else{
				message.error('预览失败!')
				setTimeout(hide, 0)
				this.setState({isBtn:false})
			}
			
		}else{
			window.open(url)
		}
	}
	renderModalItems(items){
		const { modalData }=this.props
	   	
      	return (
      		items.map((item,index)=>{
      			if(item.type==='upload'){
      				return (
      					<Row key={index}>
				   			<Col style={{textAlign:'right'}} span={7}>{item.title}：</Col>
				   			<Col span={14} >{modalData[item.dataIndex]}</Col>
				   			{modalData[item.dataIndex+'Index'] && 
								<Col span={3}>
									<Button 
										size='small' 
										onClick={this.handleReadClick.bind(this,`${modalData[item.dataIndex+'Path']}`,modalData[item.dataIndex+'Index'])}
										disabled={this.state.isBtn}
									>
										预览
									</Button>
								</Col>
							}
				   		</Row>
      				)
      			}else{
      				return (
	      				<Row key={index}>
				   			<Col style={{textAlign:'right'}} span={7}>{item.title}：</Col>
				   			<Col span={17} >{modalData[item.dataIndex]}</Col>
				   		</Row>
	      			)
      			}
      			
      		})
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