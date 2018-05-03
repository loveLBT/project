import React,{ Component } from 'react'
import { Spin } from "antd";
import echarts from "echarts";
import "echarts/lib/component/tooltip";
import 'echarts/lib/chart/lines';

class Surroundings extends Component {
	componentDidMount(){
		var myChart = echarts.init(document.getElementById('main'));
		myChart.setOption({
			legend:{
				bottom:'0',
				data:['hahaha']
			},
			tooltip: {
					trigger: 'axis'
			},
			grid: {
					left: '0',
					right: '0',
					top: '4%',
					bottom:'8%',
					width: (window.innerWidth - 200 - 68 )+ 'px',
					containLabel: true
			},
			xAxis: {
					type: 'category',
					boundaryGap: false,
					data: ['周一','周二','周三','周四','周五','周六','周日']
			},
			yAxis: {
					type: 'value'
			},
			color:['#6db0db'],
			series: [
					{
						name:'hahaha',
						type:'line',
						data:[120, 132, 101, 134, 90, 230, 210]
					}
			]
		});
	}
	render(){
		return (
			<div className='shadowBox'>
				<div style={{width:'100%',height:'400px'}} id="main">
					<Spin />
				</div>
			</div>
		)
	}
}

export default Surroundings