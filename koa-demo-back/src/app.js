import Koa from 'koa'
import compose from 'koa-compose'
import logger from 'koa-logger'
import session from 'koa-session'
import bodyParser from 'koa-bodyparser'

import config from './config/config'
import './config/db'
import router from './config/router'

const app=new Koa()
app.keys=['koa-demo-back']
const rootMiddleWare=compose([logger(),session(config.config,app),bodyParser()])

app
  .use(rootMiddleWare)
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3005,()=>{
	console.log('the server is starting at port 3005')
})
