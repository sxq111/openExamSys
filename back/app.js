const Koa = require('koa');
const mongooseInstance = require('./mongooseTools');
const controller = require('./controller');
var cors = require('koa2-cors');
var json = require('koa-json');
const koaBody = require('koa-body');
const errListener = require('./middlewares/requestErrorListener');
const registerRouter = require('./middlewares/register');

const app = new Koa();
mongooseInstance.connection.once('open', () => {
    console.log('数据库链接成功')
    const models = require('./models')(mongooseInstance)
    app.use(koaBody());
    app.use(cors());
    app.use(json());
    app.use(async (ctx, next) => {
        ctx.models = models;
        next();
    });
    app.use(errListener());
    app.use(registerRouter());
    app.use(controller());
    app.listen(4396);
    console.log('app started at port 4396...');
});

const isProduction = process.env.NODE_ENV === 'production';

// app.use(async (ctx, next) => {
//     var start = new Date().getTime(),execTime;
//     await next();
//     execTime = new Date().getTime() - start;
//     ctx.response.set('X-Response-Time', `${execTime}ms`);
//     ctx.response.set('X-Response-Time', `${execTime}ms`);
// });