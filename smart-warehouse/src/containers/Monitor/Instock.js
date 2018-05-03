import React,{ Component } from 'react'
import { Row,Col } from 'antd'

import TableBar from '../../components/TableBar'
import TitleBar from '../../components/TitleBar'
import config from '../../config/config'

class Instock extends Component {
	expandedRowRender(record){
		return (
			<p style={{ margin: 0 }}>{record.description}</p>
		)
	}
	render(){
		return (
			<div className='instock'>
				<TitleBar title='库房信息' />
				<div className='wrapper'>
					<Row>
						<Col span={16}>
							<TableBar 
								columns={config.columns}
								dataSource={config.dataSource}
								defaultExpandAllRows={true}
								expandedRowRender={this.expandedRowRender.bind(this)}
								pagination={{
									size:'small'
								}}
							/>
						</Col>
						<Col span={8}>
							<TableBar 
								className='small_table'
								columns={config.columns}
								dataSource={config.dataSource}
								size='small'
								pagination={false}
								title={()=>'aaaa'}
							/>
						</Col>
					</Row>
				</div>
				
			</div>
		)
	}
}

export default Instock