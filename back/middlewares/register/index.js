const router = require('koa-router')() //注意这里

const newUserPrepare = async (ctx, next) => {
    console.log(ctx.request.body);
    ctx.response.status = 200;
    ctx.response.body = {
        success:'true'
    };
}
router.post('/newUserPrepare', newUserPrepare);

module.exports = function(){
    return router.routes()
}