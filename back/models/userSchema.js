module.exports = function (mongoose) {
    var schema = mongoose.Schema({
        email: {
            type: String,
            match:/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/,
            required:true
        },
        userName: {
            type: String,
            minlength:6,
            maxlength:20,
            required:true,
            unique:true
        },
        password_crypted:{
            type: String,
            required:true
        },
        salt:{
            type: String,
            required:true
        }
    });
    return mongoose.model('user', schema);
}