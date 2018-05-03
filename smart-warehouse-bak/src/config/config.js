export default {
	appTitle:'智能仓库管理系统',
	userMenus:[
		{
			name:'实时监控',
			icon:'hdd',
			link:'/monitor',
			childrenMenus:[
				{
					name:'鹿城站点',
					icon:'environment',
					link:'', 
					childrenMenus:[
						{
							name:'1号库房',
							icon:'database',
							link:'',
							childrenMenus:[
								{name:'实时库存信息',icon:'',link:'/instock'},
								{name:'实时环境信息',icon:'',link:'/surroundings'}
							]
						},
						{
							name:'2号库房',
							icon:'database',
							link:'',
							childrenMenus:[
								{name:'实时库存信息',icon:'',link:'/instock'},
								{name:'实时环境信息',icon:'',link:'/surroundings'}
							]
						}
					]
				}
			]
		},
		{
			name:'物品管理',
			icon:'shopping-cart',
			link:'/article',
			childrenMenus:[
				{
					name:'物品管理',
					icon:'tags-o',
					link:'',
					childrenMenus:[
						{name:'物品管理类型',icon:'',link:'/type'},
						{name:'导入物品',icon:'',link:'/import'},
						{name:'管理物品',icon:'',link:'/management'},
						{name:'领用物品查询',icon:'',link:'/received'},
					]
				},
				{
					name:'工单管理',
					icon:'solution',
					link:'',
					childrenMenus:[
						{name:'添加工单',icon:'',link:'/add'},
						{name:'查看工单',icon:'',link:'/read'}
					]
				}
			]
		}
	],
	columns:[
		{ title: 'Name', dataIndex: 'name'  },
	    { title: 'Age', dataIndex: 'age' },
	    { title: 'Address', dataIndex: 'address' },
	],
	dataSource:[
		{ name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park', description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.' },
        { name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park', description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.' },
        { name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park', description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.' }
	],
	queryFormType:[
		{ 
			title: '物品类型名称',
			dataIndex: 'type_name',
			type:'input',
			config:{
				initialValue:'',
				rules:[{required:true,message:'请输入物品类型名称'}]
			}
		},
	    { 
	    	title: '物品类型所需大类',
	    	dataIndex: 'parent_type_id',
	    	type:'select',
	    	nameIndex:'parent_type_name',
	    	config:{
				initialValue:null,
				rules:[{required:true,message:'请选择物品类型所需大类'}]
			}
	    },
	    { 
	    	title: '物品类型单位',
	    	dataIndex: 'unit', 
	    	type:'input',
	    	config:{
	    		initialValue:'',
				rules:[{required:true,message:'请输入物品类型单位'}]
	    	}
	    },
	    { 
	    	title: '最多标签数量',
	    	dataIndex: 'label_number', 
	    	type:'number',
	    	config:{
	    		initialValue:null,
				rules:[{required:true,message:'请输入物品类型数量'}]
	    	}
	    },
	    { 
	    	title: '物品类型图标',
	    	dataIndex: 'photo', 
	    	type:'image',
	    	config:{
	    		initialValue:''
	    	}
	    },
	],
	queryManagement:[
		{ 
			title: '物品名称',
			dataIndex: 'tnam',
			type:'input',
			config:{
				initialValue:'',
				rules:[{required:true,message:'请输入物品名称'}]
			}
		},
	    { 
	    	title: '物品编号',
	    	dataIndex: 'tool_no',
	    	type:'input',
	    	config:{
				initialValue:'',
				rules:[{required:true,message:'请请输入物品编号'}]
			}
	    },
	    { 
	    	title: '所属类型',
	    	dataIndex: 'tool_type_id', 
	    	type:'select',
	    	config:{
	    		initialValue:null,
				rules:[{required:true,message:'请选择所属类型'}]
	    	}
	    },
	    { 
	    	title: '下次试验日期',
	    	dataIndex: 'label_number', 
	    	type:'date',
	    	config:{
	    		initialValue:'',
				rules:[{required:true,message:'请选择下次试验日期'}]
	    	}
	    },
	    { 
	    	title: '物品试验周期',
	    	dataIndex: 'photo', 
	    	type:'input',
	    	config:{
	    		initialValue:'',
	    		rules:[{required:true,message:'请输入物品试验周期'}]
	    	}
	    },
	    { 
	    	title: '所属站点',
	    	dataIndex: 'photo', 
	    	type:'select',
	    	config:{
	    		initialValue:null,
	    		rules:[{required:true,message:'请选择所属站点'}]
	    	}
	    },
	    { 
	    	title: '选择所属库房',
	    	dataIndex: 'photo', 
	    	type:'select',
	    	config:{
	    		initialValue:null,
	    		rules:[{required:true,message:'请选择所属库房'}]
	    	}
	    },
	    { 
	    	title: '初始库存状态',
	    	dataIndex: 'photo', 
	    	type:'select',
	    	config:{
	    		initialValue:null,
	    		rules:[{required:true,message:'请选择初始库存状态'}]
	    	}
	    },
	]
}