export function toFunction(toFunc) {
    if (typeof toFunc === 'function') {
        return toFunc;
    }
    return function () { return toFunc; };
}
export function toAsyncFunction(toFunc) {
    var _this = this;
    var func = toFunction(toFunc);
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return new Promise(function (resolve) { return resolve(func.apply(_this, args)); });
    };
}
