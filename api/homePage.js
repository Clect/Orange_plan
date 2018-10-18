const Router = require('koa-router');
const router = new Router();
const fs = require('fs');

router.get('/',(ctx, next)=>{
    ctx.body = fs.readFileSync('./dist/index.html', 'utf-8');
})

module.exports = router
