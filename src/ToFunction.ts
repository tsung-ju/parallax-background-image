export type ToFunction<A extends any[], T> = T | ((...args: A) => T)
export function toFunction<A extends any[], T> (toFunc: ToFunction<A, T>): (...args: A) => T {
    if (typeof toFunc === 'function') {
        return toFunc as (...args: A) => T
    }
    return (...args: A) => toFunc
}

type ToPromise<T> = T | Promise<T>
export type ToAsyncFunction<A extends any[], T> = ToFunction<A, ToPromise<T>>
export function toAsyncFunction<A extends any[], T> (toFunc: ToAsyncFunction<A, T>): (...args: A) => Promise<T> {
    const func = toFunction(toFunc)
    return (...args: A) => new Promise(resolve => resolve(func.apply(this, args)))
}
