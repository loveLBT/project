import React,{ Component } from 'react'

import TableBar from '../../components/TableBar'
import TableColums from '../../constants/TableColums'

class CurrentMission extends Component{
	constructor(props){
		 super(props)

		 this.state={
		 	dataSource:[]
		 }
	}

	render(){
		return (
			<div>
				<TableBar 
					columns={[]}
					dataSource={[]}
					loading={false}
				/>
			</div>
		)
	}
}

export default CurrentMission