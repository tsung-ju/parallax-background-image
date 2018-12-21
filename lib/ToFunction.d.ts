export declare type ToFunction<A extends any[], T> = T | ((...args: A) => T);
export declare function toFunction<A extends any[], T>(toFunc: ToFunction<A, T>): (...args: A) => T;
declare type ToPromise<T> = T | Promise<T>;
export declare type ToAsyncFunction<A extends any[], T> = ToFunction<A, ToPromise<T>>;
export declare function toAsyncFunction<A extends any[], T>(toFunc: ToAsyncFunction<A, T>): (...args: A) => Promise<T>;
export {};
