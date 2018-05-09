var nodemailer = require('nodemailer')
var smtpTransport = require('nodemailer-smtp-transport');
smtpTransport = nodemailer.createTransport(smtpTransport({
    service: 'QQ',
    auth: {
        user: '2231594391@qq.com',
        pass: 'nxrcwfbqnpvjecfb'
    }
}));

function sendMail(address, title, content) {
    smtpTransport.sendMail({

        from: '2231594391@qq.com',
        to: address,
        subject: title,
        html: content

    }, function (error, response) {
        if (error) {
            console.log(error);
        }
        console.log('发送邮件给'+address+'成功')
    });
}

module.exports = function(){
    return async (ctx,next)=>{
        ctx.sendMail = sendMail;
        await next();
    }
}