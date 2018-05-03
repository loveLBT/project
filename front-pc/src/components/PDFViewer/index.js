import React,{ Component } from 'react'
import { Document, Page } from 'react-pdf'
import { Row,Col } from 'antd'

import NumericInput from '../NumericInput'
import './style.css'

class PDFViewer extends Component {
	constructor(props) {
	 	super(props)
	
		this.state = {
			total: null,
  			page: 1,
		}
	}
	handleDocumentLoad({numPages}){
		this.setState({total:numPages})
	}
	handleChange(value){
		this.setState({
			page:value
		})
	}
	handleBlur(){
		const { page,total }=this.state
		if(page<total){

		}
	}
	render(){
		const { total,page }=this.state
		const { pdfPath }=this.props

		return (
			<div className='pdf'>
				<div className='pdf-header'>
					<Row>
						<Col span={6} push={2}>
							<NumericInput 
								size='small'
								value={page}
								onChange={this.handleChange.bind(this)}
								onBlur={this.handleBlur.bind(this)}
								onPressEnter={this.handleBlur.bind(this)}
								style={{width:'15%'}}
							/>
							<label className='pdf-header-input-lbael'>
								/{total}
							</label>
						</Col>
					</Row>
				</div>
				<div className='pdf-content'>
					<Row>
						<Col span={20} push={2}>
							<Document
					          	file='pdfPath'
					         	onLoadSuccess={this.handleDocumentLoad.bind(this)}
					         	noData='sorry，没有找到对应的文件...'
					         	loading='正在加载文件...'
					         	error='sorry，文件加载出错了...'
					         	className='PDFDocument'
					        >
					            <Page className='PDFPage' pageNumber={1} />
					            <Page className='PDFPage' pageNumber={2} />
					        </Document>
						</Col>
					</Row>
				</div>
			</div>
		)
	}
}

export default PDFViewer

{/*<Document
		          	file={pdfPath}
		         	onLoadSuccess={this.onDocumentLoad.bind(this)}
		        >
		          	<Page pageNumber={page} />
		        </Document>*/}