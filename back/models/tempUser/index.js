// mu
// function (mongoose){

// }
module.exports = function (mongoose) {

    var schema = mongoose.Schema({
        email: String,
        userName: String,
        tempCode:String
    });
    return mongoose.model('tempUser', schema);
}