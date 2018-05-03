import path from 'path'

export default {
	//静态文件路径
	static_path:path.join(path.resolve(),'/static'),
	//mongodb数据库模型路径
	models_path:path.join(path.resolve(),'/src/models'),
	//mongodb连接地址
	DB_URL:'mongodb://lbt:123456@192.168.1.189:27017/koa-demo'
}