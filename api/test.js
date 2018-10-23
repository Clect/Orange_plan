const Router = require('koa-router');
const router = new Router();
var AV = require('leanengine');
var Todo = AV.Object.extend('Todo');

router.post('/test',(ctx, next)=>{
    ctx.body = "hello test module router"
})

module.exports = router
