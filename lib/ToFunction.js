import * as tslib_1 from "tslib";
export function toFunction(toFunc) {
    if (typeof toFunc === 'function') {
        return toFunc;
    }
    return () => toFunc;
}
export function toAsyncFunction(toFunc) {
    const func = toFunction(toFunc);
    return function () {
        return tslib_1.__awaiter(this, arguments, void 0, function* () { return yield func.apply(this, arguments); });
    };
}
