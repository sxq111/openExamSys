const utils = require('../utils');
const md5 = require('crypto-js/md5');

module.exports = async (ctx, next) => {
    let { id, token } = ctx.header;
    let minute = Math.floor(Date.now()/(1000*60));
    let minute_1 = minute - 1, minute_2 = minute - 2;
    let rst = await utils.findOnePromise(ctx.models.userModel, { userName: id });
    if (!rst) throw new Error('用户验证失败1');
    let c1, c2, c3;
    c1 = md5(rst.password_crypted + minute).toString();
    c2 = md5(rst.password_crypted + minute_1).toString();
    c3 = md5(rst.password_crypted + minute_2).toString();
    let set = { [c1]: true, [c2]: true, [c3]: [true] };
    console.log(minute);
    if (!set[token]) { throw new Error('用户验证失败2'); return; }
    console.log('用户验证成功');
    ctx.currentUserId = rst.userName;
    next();
}