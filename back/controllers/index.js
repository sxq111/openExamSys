// index:

module.exports = {
    'GET /': async (ctx, next) => {
        throw new Error('xxxxx')
        ctx.response.status = 200;
        ctx.response.body = 'get ok';
    },
    'POST /login': async (ctx, next) => {
        //console.log(ctx.request.body);
        let body = ctx.request.body;
        let rst = ctx.db_tools.mdbTestModel(ctx.models.USER, body);
        if (rst.fail) {
            ctx.response.status = 400;
            ctx.response.body = rst;
            console.log(ctx.response.body);
            return;
        }
        let promise_rst = await ctx.db_tools.mdbFind('users', ctx.request.body);
        if (promise_rst.length <= 0) {
            ctx.response.status = 400;
            ctx.response.body = {fail:'unknow id/pwd'};
            console.log(ctx.response.body);
            return;
        }
        ctx.response.body = {
            userId:promise_rst[0].id,
        };
        
    },
    'GET /test': async (ctx, next) => {
        let err = new Error('erraaaaaaaa');
        throw err;
        ctx.response.body = {sxq:'asdasd'};
    },
};
