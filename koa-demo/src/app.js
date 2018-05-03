import Koa from 'koa'
import compose from 'koa-compose'
import logger from 'koa-logger'
import serve  from 'koa-static'
import bodyParser from 'koa-bodyparser'
import session from 'koa-session'
import path from 'path'

import config from './config/config'
import './config/db'
import router from './config/router'

const app=new Koa()
app.keys=['koa-demo']

const rootMiddleWare=compose([logger(),serve(config.static_path),session(app),bodyParser()])

app
  .use(rootMiddleWare)
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3002,()=>{
	console.log('the server is starting at port 3000')
})