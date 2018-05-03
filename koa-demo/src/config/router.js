import Router from 'koa-router'
import * as User  from '../controllers/user'
import * as App  from '../controllers/app'

const router =new Router({
	prefix:'/api'
})

router.post('/user/singup',App.hasBody,User.singup)
router.post('/user/verify',App.hasBody,User.verify)
router.post('/user/update',App.hasBody,App.hasToken,User.update)


export default router