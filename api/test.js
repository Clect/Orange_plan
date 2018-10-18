const Router = require('koa-router');
const router = new Router();
router.get('/test',(ctx, next)=>{
    ctx.body = "hello test module router"
})

module.exports = router
