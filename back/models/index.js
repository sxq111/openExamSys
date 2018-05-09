module.exports = function (instance) {
    return {
        tempUserModel: require('./tempUser')(instance),
        userModel: require('./userSchema')(instance)
    }

}