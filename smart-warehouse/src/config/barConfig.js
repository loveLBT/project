export default {
	statementLog:[
		{ 
			title: '物品类型名称',
			dataIndex: 'storage_room_id',
			type:'select',
			config:{
				initialValue:'',
				rules:[{required:false,message:'请输入物品类型名称'}]
			}
		},
			{
				title: '开始时间',
	    	dataIndex: 'start_time', 
				type:'time',
	    	config:{
					initialValue:'',
					rules: [{ required: false, message: '请选择时间!' }],
				},
			},
			{
				title: '结束时间',
	    	dataIndex: 'end_time', 
				type:'time',
	    	config:{
					initialValue:'',
					rules: [{ required: false, message: 'Please select time!' }],
				},
			}
	],
	CompanyName:[
		{ 
			title: '总公司名称',
			dataIndex: 'company_name', 
			type:'input',
			config:{
				initialValue:'',
				rules:[{required:true,message:'请输入公司名称'}]
			}
		},
	],
	site:[
		{ 
			title: '站点名称',
			dataIndex: 'site_name', 
			type:'input',
			config:{
				initialValue:'',
				rules:[{required:true,message:'请输入站点名称'}],
			}
		},{
			title:'下拉框测试',
			dataIndex:'demo',
			type:'select',
			url:'/site/getListSiteName',
			// options:[{
			// 	value:333,
			// 	text:222,
			// }],
			config:{
				initialValue:'',
				rules:[{required:true,message:'请输入站点名称'}],
			}
		},{
			title:'多选框测试',
			dataIndex:'deoms',
			type:'checkbox',
			options:[{
				value:'111',
				label:222,
			},{
				value:'333',
				label:444,
			},{
				value:'555',
				label:666,
			}],
			config:{
				initialValue:['111','333'],
				rules:[{required:true,message:'请输入站点名称'}],
			}
		},{
			title:'上传图片',
			dataIndex:'imgs',
			type:'upImg',
		},{ 
			title: 'demo',
			dataIndex: 'checkInput', 
			type:'checkInput',
			options:[{
				value:'111',
				label:222,
				uitl:"双",
				num:10,
			},{
				value:'333',
				label:444,
				uitl:"双",
				num:10,
			},{
				value:'555',
				label:666,
				uitl:"双",
				num:10,
			}],
			config:{
				initialValue:['111','333'],
				rules:[{required:true,message:'请输入站点名称'}],
			}
		}
	],
	baofei:[
		{
			dataIndex:"a",
			header_id:73,
			options:null,
			sign:"tianjiawupin",
			title:"是否可用",
			type:"select",
			url:'/aaa',
			config:null
		},
		{
			dataIndex:"b",
			header_id:74,
			options:null,
			sign:"tianjiawupin",
			title:"生产厂家",
			type:"select",
			url:'/aaa',
			config:null
		},
		{
			dataIndex:"c",
			header_id:75,
			options:null,
			sign:"tianjiawupin",
			title:"产品型号",
			type:"select",
			url:'/aaa',
			config:null
		},
		{
			dataIndex:"d",
			header_id:76,
			options:null,
			sign:"tianjiawupin",
			title:"出厂日期",
			type:"select",
			url:'/aaa',
			config:null
		},
		{
			dataIndex:"d",
			header_id:76,
			options:null,
			sign:"tianjiawupin",
			title:"供应商",
			type:"select",
			url:'/aaa',
			config:null
		}

	]
}