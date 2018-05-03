import Router from 'koa-router'

import * as User from '../controllers/user'
import * as App from '../controllers/app'
import * as Comment from '../controllers/comment'
import * as Movie from '../controllers/Movie'
import * as Category from '../controllers/category'

const router=new Router({
	prefix:'/api'
})

router.post('/user/signup',App.hasBody,User.signup)
router.post('/user/signin',App.hasBody,User.signin)
router.get('/users',User.list)

router.post('/comment',Comment.save)
router.put('/comment/:id',Comment.update)

router.post('/movie',Movie.save)
router.get('/movies',Movie.list)
router.get('/movie/:id',Movie.detail)

router.post('/category',Category.save)
router.get('/categorys',Category.list)

export default router