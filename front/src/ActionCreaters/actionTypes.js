const actionTypes = {
    getCheckCode: '发送邮箱和用户名来得到验证码',
    typeInCheckCode: '等待用户输入验证码',
    sendCryptoToServe: '发送加密后的密码信息到服务端，用来创建新用户',
    toLogin: '切换到登陆界面',
}

export default makeEnum(actionTypes);

export function makeEnum(obj) {
    return new Proxy(obj, {
        get(target, prop) {
            if (target[prop]) {
                return Reflect.get(target, prop)
            } else {
                throw new ReferenceError(`Unknown Enum '${prop}'`)
            }
        },

        set() {
            throw new TypeError('Enum is readonly')
        },

        deleteProperty() {
            throw new TypeError('Enum is readonly')
        }
    });
}
