export function toFunction(toFunc) {
    if (typeof toFunc === 'function') {
        return toFunc;
    }
    return (...args) => toFunc;
}
export function toAsyncFunction(toFunc) {
    const func = toFunction(toFunc);
    return (...args) => new Promise(resolve => resolve(func.apply(this, args)));
}
