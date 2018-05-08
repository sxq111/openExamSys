const actionTypes = {
    actiontype1: '第一个测试action类型'
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
