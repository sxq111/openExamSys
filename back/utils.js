function findOnePromise(model, query) {
    return new Promise((resolve, reject) => {
        model.findOne(query, function (err, rst) {
            resolve(rst)
        });
    })
}
module.exports = {
    findOnePromise
}