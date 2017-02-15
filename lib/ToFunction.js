export function toFunction(toFunc) {
    if (typeof toFunc === 'function') {
        return toFunc;
    }
    return () => toFunc;
}
export function toAsyncFunction(toFunc) {
    const func = toFunction(toFunc);
    return function () { return new Promise(resolve => resolve(func.apply(this, arguments))); };
}
