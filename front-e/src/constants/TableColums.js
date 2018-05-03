//修改密码
export const EditPassword=[
    { 
        title: '新密码', 
        dataIndex: 'password', 
        key: 'password',
        initialValue:'',
        type:'input',
        rules:[
            {required:true,message:'请输入密码'},
            {pattern:/^[A-Za-z0-9]{6,20}$/,message:'密码长度为6-20位'}
        ]
    }
]

//配网定值单查询
export const NetWorkSearch=[
    { title: '定值区号', dataIndex: 'VfAreano', key: 'VfAreano',initialValue:null,type:'select',optionIndex:'dzq'},
    { title: '变电所', dataIndex: 'DsID', key: 'DsID',initialValue:null,type:'select',optionIndex:'bds'},
    { title: '调度管辖', dataIndex: 'VfDdgx', key: 'VfDdgx',initialValue:null,type:'select',optionIndex:'ddgx'},
    { title: '定值单状态', dataIndex: 'VfState', key: 'VfState',initialValue:null,type:'select',optionIndex:'status'},
    { title: '编号', dataIndex: 'VfNo', key: 'VfNo',initialValue:'',type:'input'},
    { title: '设备名称', dataIndex: 'VfDevicename', key: 'VfDevicename',initialValue:'',type:'input'},
    { title: '保护型号', dataIndex: 'VfModel', key: 'VfModel',initialValue:'',type:'input'},
    { title: '保护名称', dataIndex: 'VfProtectname', key: 'VfProtectname',initialValue:'',type:'input'},
    { title: '版本号', dataIndex: 'VfVersion', key: 'VfVersion',initialValue:'',type:'input'},
]

//定值单执行
export const Executive=[
    { title: '校验单位',dataIndex: 'VfCheckunit', key: 'VfCheckunit',initialValue:'',type:'input'},
    { title: '校验负责人',dataIndex: 'VfChecks', key: 'VfChecks',initialValue:'',type:'input'},
    { title: '执行日期',dataIndex: 'VfExecutedate', key: 'VfExecutedate',initialValue:'',type:'datepicker'},
    { title: '运行单位',dataIndex: 'VfRununit', key: 'VfRununit',initialValue:'',type:'input'},
    { title: '核对人',dataIndex: 'VfCollator', key: 'VfCollator',initialValue:'',type:'input'},
    { title: '核对日期',dataIndex: 'VfCollatedate', key: 'VfCollatedate',initialValue:null,type:'datepicker'},
]

//定值单人员管理
export const UserManage=[
    { title: '用户名称',dataIndex: 'name', key: 'name',initialValue:'',type:'input'},
    { title: '用户登录名', dataIndex: 'username', key: 'username',initialValue:'',type:'input'},
    { title: '用户登入密码', dataIndex: 'password', key: 'password',initialValue:'',type:'input'},
    { title: '联系电话',dataIndex: 'phone', key: 'phone',initialValue:'',type:'input'},
    { title: '用户类型',dataIndex: 'roleID', key: 'roleID',initialValue:null,type:'select',optionIndex:'roles'},
    { title: '调度管辖',dataIndex: 'ddgxID', key: 'ddgxID',initialValue:null,type:'select',optionIndex:'ddgx'},
]
//查询定值单人员管理
export const UserManageSearch=[
    { title: '用户名称',dataIndex: 'name', key: 'name',initialValue:'',type:'input'},
    { title: '用户登入名',dataIndex: 'username', key: 'username',initialValue:'',type:'input'},
    { title: '联系电话',dataIndex: 'phone', key: 'phone',initialValue:'',type:'input'},
    { title: '用户类型',dataIndex: 'roleID', key: 'roleID',initialValue:null,type:'select',optionIndex:'roles'},
    { title: '调度管辖',dataIndex: 'ddgxID', key: 'ddgxID',initialValue:null,type:'select',optionIndex:'ddgx'},
]
//变电所与用户关系
export const Station=[
    { title: '变电所', dataIndex: 'stationName', key: 'stationName',initialValue:'',type:'input'},
    { title: '集控站',  dataIndex: 'centralControlStation', key: 'centralControlStation',initialValue:null,type:'select',optionIndex:'jkz'},
    { title: '投产日期', dataIndex: 'onStreamDate', key: 'onStreamDate',initialValue:'',type:'datepicker'},
    { title: '电压等级', dataIndex: 'voltageClassID', key: 'voltageClassID',initialValue:null,type:'select',optionIndex:'dydj'},
    { title: '备注', dataIndex: 'remark', key: 'remark',initialValue:'',type:'textarea'},
    { title: '是否退役', dataIndex: 'isRetire', key: 'isRetire',initialValue:false,type:'checkbox'},

]
//查询变电所与用户关系
export const StationSearch=[
    { title: '变电所', dataIndex: 'keywords', key: 'keywords',initialValue:'',type:'input'},
    { title: '集控站', dataIndex: 'centralControlStation', key: 'centralControlStation',initialValue:null,type:'select',optionIndex:'jkz'},
    { title: '电压等级', dataIndex: 'level', key: 'level',initialValue:null,type:'select',optionIndex:'dydj'},
]
//线路限额
export const LineLimits=[
    { title: '类型',dataIndex: 'lineType', key: 'lineType',initialValue:null,type:'select',optionIndex:'lx'},
    { title: '型号', dataIndex: 'stype', key: 'stype',initialValue:'',type:'input'},
    { title: '夏季标准',dataIndex: 'summer', key: 'summer',initialValue:null,type:'inputnumber'},
    { title: '冬季标准',dataIndex: 'winter', key: 'winter',initialValue:null,type:'inputnumber'},
]
//查询线路限额
export const LineLimitsSearch=[
    { title: '型号', dataIndex: 'keyword', key: 'keyword',initialValue:'',type:'input'},
    { title: '类型', dataIndex: 'lineType', key: 'lineType',initialValue:null,type:'select',optionIndex:'lx'},
]
//集控站与变电所关系
export const CentralControl=[
    { 
        title: '集控站名称', 
        dataIndex: 'name', 
        key: 'name',
        initialValue:'',
        type:'input',
        rules:[
            {required:true,message:'请输入集控站名称'},
        ]
    }
]