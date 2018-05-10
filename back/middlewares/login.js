const router = require('koa-router')() //注意这里
var CryptoJS = require("crypto-js");
const md5 = require('crypto-js/md5');
const utils = require('../utils');

const loginPrepare = async (ctx, next) => {
    let code = '' + Math.floor(Math.random() * 100000000);
    let {id} = ctx.request.body;
      await utils.findOnePromise(ctx.models.loginTempData,{userName:id});


}
router.post('/loginPrepare', loginPrepare);



module.exports = function () {
    return router.routes()
}
