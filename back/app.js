const Koa = require('koa');
const mongooseInstance = require('./mongooseTools');
const controller = require('./controller');
var cors = require('koa2-cors');
var json = require('koa-json');
const koaBody = require('koa-body');
const errListener = require('./middlewares/requestErrorListener');
const registerRouter = require('./middlewares/register');
const mail = require('./middlewares/mail');
const app = new Koa();
app.on('error', (err, ctx) => {
    console.log('internal error', err)
})

mongooseInstance.connection.once('open', () => {
    console.log('数据库链接成功')
    const models = require('./models')(mongooseInstance)
    app.use(koaBody());
    app.use(cors());
    app.use(json());
    app.use(errListener());
    app.use(async (ctx, next) => {
        ctx.models = models;
        await next();
    });
    app.use(mail())
    app.use(registerRouter());
    app.use(controller());
    app.listen(4396);
    console.log('app started at port 4396...');
    // models.tempUserModel.findOne({ 'userName': 'sxq111' }, function (err, person) {
    //     console.log('1', person);
    // });
    // findOnePromise(models.tempUserModel, { 'userName': 'sxq111' }).then(rst => {
    //     console.log(2, rst);
    // })


});

const isProduction = process.env.NODE_ENV === 'production';

// app.use(async (ctx, next) => {
//     var start = new Date().getTime(),execTime;
//     await next();
//     execTime = new Date().getTime() - start;
//     ctx.response.set('X-Response-Time', `${execTime}ms`);
//     ctx.response.set('X-Response-Time', `${execTime}ms`);
// });
// function findOnePromise(model, query) {
//     return new Promise((resolve, reject) => {

//         model.findOne(query, function (err, rst) {
//             resolve(rst)
//         });
//     })
// }
