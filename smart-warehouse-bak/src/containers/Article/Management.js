import React,{ Component } from 'react'

import config from '../../config/config'
import TableBar from '../../components/TableBar'
import FormBar from '../../components/FormBar'
import TitleBar from '../../components/TitleBar'

class Management extends Component {
	constructor(props) {
	 	super(props)
	
	  	this.state = {
	  		dataSource:[]
	  	}
	}
	handleFormSubmit(e){
		e.preventDefault()
		
		this.form.validateFields((err, values) =>{
			console.log(values)
		})
	}
	render(){
		const { dataSource }=this.state
		
		return (
			<div className='management'>
				<TitleBar title='添加物品' />
				<div className='wrapper' style={{marginBottom:'15px'}}>
					<FormBar 
						ref={form=>this.form=form}
						layout='inline' 
						formItems={config.queryManagement}
						formBtns={[
							{text:'添加',handleClick:this.handleFormSubmit.bind(this)}
						]}
					/>
				</div>
				<TitleBar title='物品列表' />
				<div className='wrapper'>
					<TableBar 
						columns={config.queryManagement}
						dataSource={dataSource}
						pagination={{
							size:'small'
						}}
						showNumColumn={true}
					/>
				</div>
			</div>
		)
	}
}

export default Management