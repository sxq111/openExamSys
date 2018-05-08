function listener() {
    return async (ctx, next) => {
        try {
            await next();
        } catch (e) {
            console.log('ERROR',e.message)
            ctx.response.status = 400;
            ctx.response.body = e.message;
        }
    }
}

module.exports = listener;