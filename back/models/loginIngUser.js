module.exports = function (mongoose) {
    var schema = mongoose.Schema({
        userName: {
            type: String,
            required:true,
            unique:true
        },
        loginTime:{
            type: Number,
        },
        randomCode:{
            type: Number,
        },
        pass:{
            type:Boolean
        }
    });
    return mongoose.model('loginUserTempData', schema);
}