export const SimpleAutoBind = myDecorator;
export const debounceIntervalDecorator = makeDebounce;
export const waitingForDecorator = waitingFor;
export const testDesc = test;

function test(aname) {
    return function (target, name, desc) {
        console.log(aname, target, name, desc);
    }
}

function myDecorator(target, name, { value: fn, configurable, enumerable }) {
    if (!name) {
        throw new Error('this decorator must be used for class property');
    }
    return {
        configurable,
        enumerable,
        get() {
            if (target.isPrototypeOf(this)) {
                //如果target是this 的 原型
                if (!this.hasOwnProperty('constructor')) {
                    //确保this是一个实例
                    return fn.bind(this)
                }
            }
            throw new Error('the symbol this is not a instance');
        }
    }
}
function makeDebounce(step = 100) {
    return function debounce(target, name, { value: fn }) {
        if (!name) {
            throw new Error('this decorator must be used for class property');
        }
        let lastTimer = null;
        function getTimmer() {
            return lastTimer;
        }
        return {
            value: function (...args) {
                if (lastTimer) {
                    clearInterval(lastTimer);
                }
                lastTimer = setInterval(fn.bind(this, getTimmer, ...args), step);
            }
        }
    }
}

function waitingFor(target, name, { value: fn }) {
    if (!name) {
        throw new Error('this decorator must be used for class property');
    }
    let busying = false;
    function finish() {
        busying = false;
    }
    return {
        value: function (...args) {
            if (busying) {
                return;
            }
            busying = true;
            fn.apply(this, [finish, ...args]);
        }
    }
}