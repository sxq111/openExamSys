function listener() {
    let err = null;
    return async (ctx, next) => {
        try {
            await next();
        } catch (e) {
            console.log('ERRORCATCH', e.message);
            err = e;
        } finally {
            if(!err)return;
            ctx.response.status = 400;
            ctx.response.body = {error:err.message};
            err = null;
        }
    }
}

module.exports = listener;