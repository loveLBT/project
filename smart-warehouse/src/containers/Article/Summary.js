import React,{ Component } from 'react'
import { Row,Col } from 'antd'

import config from '../../config/config'
import TitleBar from '../../components/TitleBar'
import DynamiTable from "../../components/DynamiTable"

class Summary extends Component {
	constructor(props) {
	    super(props)
	
	    this.state = {
	    	tableLoading:false
	    }
	}
	expandedRowRender(expandedRowKey,record){
		return (
			<p style={{ margin: 0 }}>{record[expandedRowKey]}</p>
		)
	}
	render(){
		const { tableLoading } = this.state

		return (
			<div>
				<Row>
					<Col span={8}>
						<div className='tableTitle'>物品信息汇总</div>
						<DynamiTable
							columns={config.columns} 
							dataSource={config.dataSource}
							pagination={false}
							defaultExpandAllRows={true}
							expandedRowRender={this.expandedRowRender.bind(this,'description')}
							loading={tableLoading}
						/>
					</Col>
					<Col span={8}>
						
					</Col>
					<Col span={8}>
						
					</Col>
				</Row>
			</div>
		)
	}
}

export default Summary