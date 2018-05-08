module.exports = function (instance) {
    return {
        tempUserModelFactory: require('./tempUser')(instance)
    }

}