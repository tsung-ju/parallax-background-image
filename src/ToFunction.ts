
export type Function0<Result> = () => Result
export type ToFunction0<Result> = (() => Result) | Result
export type AsyncFunction0<Result> = () => Promise<Result>
export type ToAsyncFunction0<Result> = ToFunction0<Promise<Result> | Result>

export type Function1<Arg0, Result> = (arg0: Arg0) => Result
export type ToFunction1<Arg0, Result> = ((arg0: Arg0) => Result) | Result
export type AsyncFunction1<Arg0, Result> = (arg0: Arg0) => Promise<Result>
export type ToAsyncFunction1<Arg0, Result> = ToFunction1<Arg0, Promise<Result> | Result>

export type Function2<Arg0, Arg1, Result> = (arg0: Arg0, arg1: Arg1) => Result
export type ToFunction2<Arg0, Arg1, Result> = ((arg0: Arg0, arg1: Arg1) => Result) | Result
export type AsyncFunction2<Arg0, Arg1, Result> = (arg0: Arg0, arg1: Arg1) => Promise<Result>
export type ToAsyncFunction2<Arg0, Arg1, Result> = ToFunction2<Arg0, Arg1, Promise<Result> | Result>

export type Function3<Arg0, Arg1, Arg2, Result> = (arg0: Arg0, arg1: Arg1, arg2: Arg2) => Result
export type ToFunction3<Arg0, Arg1, Arg2, Result> = ((arg0: Arg0, arg1: Arg1, arg2: Arg2) => Result) | Result
export type AsyncFunction3<Arg0, Arg1, Arg2, Result> = (arg0: Arg0, arg1: Arg1, arg2: Arg2) => Promise<Result>
export type ToAsyncFunction3<Arg0, Arg1, Arg2, Result> = ToFunction3<Arg0, Arg1, Arg2, Promise<Result> | Result>

export type Function4<Arg0, Arg1, Arg2, Arg3, Result> = (arg0: Arg0, arg1: Arg1, arg2: Arg2, arg3: Arg3) => Result
export type ToFunction4<Arg0, Arg1, Arg2, Arg3, Result> = ((arg0: Arg0, arg1: Arg1, arg2: Arg2, arg3: Arg3) => Result) | Result
export type AsyncFunction4<Arg0, Arg1, Arg2, Arg3, Result> = (arg0: Arg0, arg1: Arg1, arg2: Arg2, arg3: Arg3) => Promise<Result>
export type ToAsyncFunction4<Arg0, Arg1, Arg2, Arg3, Result> = ToFunction4<Arg0, Arg1, Arg2, Arg3, Promise<Result> | Result>

export type Function5<Arg0, Arg1, Arg2, Arg3, Arg4, Result> = (arg0: Arg0, arg1: Arg1, arg2: Arg2, arg3: Arg3, arg4: Arg4) => Result
export type ToFunction5<Arg0, Arg1, Arg2, Arg3, Arg4, Result> = ((arg0: Arg0, arg1: Arg1, arg2: Arg2, arg3: Arg3, arg4: Arg4) => Result) | Result
export type AsyncFunction5<Arg0, Arg1, Arg2, Arg3, Arg4, Result> = (arg0: Arg0, arg1: Arg1, arg2: Arg2, arg3: Arg3, arg4: Arg4) => Promise<Result>
export type ToAsyncFunction5<Arg0, Arg1, Arg2, Arg3, Arg4, Result> = ToFunction5<Arg0, Arg1, Arg2, Arg3, Arg4, Promise<Result> | Result>

export type Function6<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Result> = (arg0: Arg0, arg1: Arg1, arg2: Arg2, arg3: Arg3, arg4: Arg4, arg5: Arg5) => Result
export type ToFunction6<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Result> = ((arg0: Arg0, arg1: Arg1, arg2: Arg2, arg3: Arg3, arg4: Arg4, arg5: Arg5) => Result) | Result
export type AsyncFunction6<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Result> = (arg0: Arg0, arg1: Arg1, arg2: Arg2, arg3: Arg3, arg4: Arg4, arg5: Arg5) => Promise<Result>
export type ToAsyncFunction6<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Result> = ToFunction6<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Promise<Result> | Result>

export type Function7<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Result> = (arg0: Arg0, arg1: Arg1, arg2: Arg2, arg3: Arg3, arg4: Arg4, arg5: Arg5, arg6: Arg6) => Result
export type ToFunction7<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Result> = ((arg0: Arg0, arg1: Arg1, arg2: Arg2, arg3: Arg3, arg4: Arg4, arg5: Arg5, arg6: Arg6) => Result) | Result
export type AsyncFunction7<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Result> = (arg0: Arg0, arg1: Arg1, arg2: Arg2, arg3: Arg3, arg4: Arg4, arg5: Arg5, arg6: Arg6) => Promise<Result>
export type ToAsyncFunction7<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Result> = ToFunction7<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Promise<Result> | Result>

export type Function8<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Arg7, Result> = (arg0: Arg0, arg1: Arg1, arg2: Arg2, arg3: Arg3, arg4: Arg4, arg5: Arg5, arg6: Arg6, arg7: Arg7) => Result
export type ToFunction8<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Arg7, Result> = ((arg0: Arg0, arg1: Arg1, arg2: Arg2, arg3: Arg3, arg4: Arg4, arg5: Arg5, arg6: Arg6, arg7: Arg7) => Result) | Result
export type AsyncFunction8<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Arg7, Result> = (arg0: Arg0, arg1: Arg1, arg2: Arg2, arg3: Arg3, arg4: Arg4, arg5: Arg5, arg6: Arg6, arg7: Arg7) => Promise<Result>
export type ToAsyncFunction8<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Arg7, Result> = ToFunction8<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Arg7, Promise<Result> | Result>

export type Function9<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Arg7, Arg8, Result> = (arg0: Arg0, arg1: Arg1, arg2: Arg2, arg3: Arg3, arg4: Arg4, arg5: Arg5, arg6: Arg6, arg7: Arg7, arg8: Arg8) => Result
export type ToFunction9<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Arg7, Arg8, Result> = ((arg0: Arg0, arg1: Arg1, arg2: Arg2, arg3: Arg3, arg4: Arg4, arg5: Arg5, arg6: Arg6, arg7: Arg7, arg8: Arg8) => Result) | Result
export type AsyncFunction9<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Arg7, Arg8, Result> = (arg0: Arg0, arg1: Arg1, arg2: Arg2, arg3: Arg3, arg4: Arg4, arg5: Arg5, arg6: Arg6, arg7: Arg7, arg8: Arg8) => Promise<Result>
export type ToAsyncFunction9<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Arg7, Arg8, Result> = ToFunction9<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Arg7, Arg8, Promise<Result> | Result>
export function toFunction<Result> (toFunc: ToFunction0<Result>): Function0<Result>;
export function toFunction<Arg0, Result> (toFunc: ToFunction1<Arg0, Result>): Function1<Arg0, Result>;
export function toFunction<Arg0, Arg1, Result> (toFunc: ToFunction2<Arg0, Arg1, Result>): Function2<Arg0, Arg1, Result>;
export function toFunction<Arg0, Arg1, Arg2, Result> (toFunc: ToFunction3<Arg0, Arg1, Arg2, Result>): Function3<Arg0, Arg1, Arg2, Result>;
export function toFunction<Arg0, Arg1, Arg2, Arg3, Result> (toFunc: ToFunction4<Arg0, Arg1, Arg2, Arg3, Result>): Function4<Arg0, Arg1, Arg2, Arg3, Result>;
export function toFunction<Arg0, Arg1, Arg2, Arg3, Arg4, Result> (toFunc: ToFunction5<Arg0, Arg1, Arg2, Arg3, Arg4, Result>): Function5<Arg0, Arg1, Arg2, Arg3, Arg4, Result>;
export function toFunction<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Result> (toFunc: ToFunction6<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Result>): Function6<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Result>;
export function toFunction<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Result> (toFunc: ToFunction7<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Result>): Function7<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Result>;
export function toFunction<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Arg7, Result> (toFunc: ToFunction8<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Arg7, Result>): Function8<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Arg7, Result>;
export function toFunction<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Arg7, Arg8, Result> (toFunc: ToFunction9<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Arg7, Arg8, Result>): Function9<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Arg7, Arg8, Result>;
export function toFunction (toFunc) {
    if (typeof toFunc === 'function') {
        return toFunc
    }
    return () => toFunc
}
export function toAsyncFunction<Result> (toFunc: ToAsyncFunction0<Result>): AsyncFunction0<Result>;
export function toAsyncFunction<Arg0, Result> (toFunc: ToAsyncFunction1<Arg0, Result>): AsyncFunction1<Arg0, Result>;
export function toAsyncFunction<Arg0, Arg1, Result> (toFunc: ToAsyncFunction2<Arg0, Arg1, Result>): AsyncFunction2<Arg0, Arg1, Result>;
export function toAsyncFunction<Arg0, Arg1, Arg2, Result> (toFunc: ToAsyncFunction3<Arg0, Arg1, Arg2, Result>): AsyncFunction3<Arg0, Arg1, Arg2, Result>;
export function toAsyncFunction<Arg0, Arg1, Arg2, Arg3, Result> (toFunc: ToAsyncFunction4<Arg0, Arg1, Arg2, Arg3, Result>): AsyncFunction4<Arg0, Arg1, Arg2, Arg3, Result>;
export function toAsyncFunction<Arg0, Arg1, Arg2, Arg3, Arg4, Result> (toFunc: ToAsyncFunction5<Arg0, Arg1, Arg2, Arg3, Arg4, Result>): AsyncFunction5<Arg0, Arg1, Arg2, Arg3, Arg4, Result>;
export function toAsyncFunction<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Result> (toFunc: ToAsyncFunction6<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Result>): AsyncFunction6<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Result>;
export function toAsyncFunction<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Result> (toFunc: ToAsyncFunction7<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Result>): AsyncFunction7<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Result>;
export function toAsyncFunction<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Arg7, Result> (toFunc: ToAsyncFunction8<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Arg7, Result>): AsyncFunction8<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Arg7, Result>;
export function toAsyncFunction<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Arg7, Arg8, Result> (toFunc: ToAsyncFunction9<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Arg7, Arg8, Result>): AsyncFunction9<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Arg7, Arg8, Result>;
export function toAsyncFunction (toFunc) {
    const func = toFunction(toFunc)
    return (...args) => new Promise(resolve => resolve(func.apply(this, args)))
}
