const router = require('koa-router')() //注意这里
var CryptoJS = require("crypto-js");
const md5 = require('crypto-js/md5');
const utils = require('../utils');

const loginPrepare = async (ctx, next) => {
    ctx.response.status = 200;
    ctx.response.body = {
          success:true
    };
}
router.post('/loginPrepare', loginPrepare);



module.exports = function () {
    return router.routes()
}
