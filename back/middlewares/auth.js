const utils = require('../utils');
const md5 = require('crypto-js/md5');

module.exports = async (ctx, next) => {
    let { id, token } = ctx.header;
    let minute = Date.now() / (1000 * 60);
    let minute_1 = minute - 1, minute_2 = minute - 2;
    let rst = await utils.findOnePromise( ctx.models.userModel,{userName:id});
    if(!rst)throw new Error('用户验证失败');
    // let testToken1 = md5(rst.),
}