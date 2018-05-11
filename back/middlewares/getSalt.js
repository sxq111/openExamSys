const router = require('koa-router')() //注意这里
const utils = require('../utils');
router.get('/getsalt', async (ctx,next)=>{
    let {querystring} = ctx;
    querystring = querystring.replace(/id=/,'');
    console.log('find ',querystring)
    let thisUser = await utils.findOnePromise(ctx.models.userModel,{userName:querystring});
    if(!thisUser)throw new Error('do not have this id');
    ctx.response.status = 200;
    ctx.response.body = {
        salt:thisUser.salt
    }
});

module.exports = function () {
    return router.routes()
}