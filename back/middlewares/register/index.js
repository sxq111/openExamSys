const router = require('koa-router')() //注意这里
var CryptoJS = require("crypto-js");
const md5 = require('crypto-js/md5');

const newUserPrepare = async (ctx, next) => {
    let code = '' + Math.floor(Math.random() * 1000000);
    let tempUser = new ctx.models.tempUserModel({
        email: ctx.request.body.email,
        userName: ctx.request.body.id,
        tempCode: code
    });
    let rst = await tempUser.save();
    if (rst) {
        console.log('创建tempUser成功', ctx.request.body.id);
        ctx.sendMail(ctx.request.body.email, '开源考试验证码BySXQ', '您的验证码为:' + code);
        ctx.response.status = 200;
        ctx.response.body = {
            success: 'mail send',
        }
    }
}
const newUserCreate = async (ctx, next) => {
    let { id, pwd_cryptoed } = ctx.request.body;
    let rst = await findOnePromise(ctx.models.tempUserModel, { 'userName': id });
    var bytes  = CryptoJS.AES.decrypt(pwd_cryptoed, rst.tempCode);
    var plainPwd = bytes.toString(CryptoJS.enc.Utf8);
    // console.log(plainPwd)
    let salt = '' + Math.floor(Math.random() * 1000000);
    let newUser = new ctx.models.userModel({
        email: rst.email,
        userName:rst.userName,
        salt:salt,
        password_crypted:md5(plainPwd+salt).toString()
    });
    await newUser.save();
    ctx.response.status = 200;
    ctx.response.body = {
        success: 'new user created',
    }

}

router.post('/newUserPrepare', newUserPrepare);
router.post('/newUserCreate', newUserCreate);

function findOnePromise(model, query) {
    return new Promise((resolve, reject) => {
        model.findOne(query, function (err, rst) {
            resolve(rst)
        });
    })
}
module.exports = function () {
    return router.routes()
}
