
export type Function0<Result> = () => Result
export type ToFunction0<Result> = (() => Result) | Result
export function toFunction0<Result> (toFunc: ToFunction0<Result>): Function0<Result> {
    if (typeof toFunc === 'function') {
        return toFunc
    }
    return () => toFunc
}

export type AsyncFunction0<Result> = () => Promise<Result>
export type ToAsyncFunction0<Result> = ToFunction0<Promise<Result> | Result>
export function toAsyncFunction0<Result> (toFunc: ToAsyncFunction0<Result>): AsyncFunction0<Result> {
    const func = toFunction0(toFunc)
    return () => new Promise(resolve => resolve(func()))
}


export type Function1<Arg0, Result> = (arg0: Arg0) => Result
export type ToFunction1<Arg0, Result> = ((arg0: Arg0) => Result) | Result
export function toFunction1<Arg0, Result> (toFunc: ToFunction1<Arg0, Result>): Function1<Arg0, Result> {
    if (typeof toFunc === 'function') {
        return toFunc
    }
    return (arg0: Arg0) => toFunc
}

export type AsyncFunction1<Arg0, Result> = (arg0: Arg0) => Promise<Result>
export type ToAsyncFunction1<Arg0, Result> = ToFunction1<Arg0, Promise<Result> | Result>
export function toAsyncFunction1<Arg0, Result> (toFunc: ToAsyncFunction1<Arg0, Result>): AsyncFunction1<Arg0, Result> {
    const func = toFunction1(toFunc)
    return (arg0: Arg0) => new Promise(resolve => resolve(func(arg0)))
}


export type Function2<Arg0, Arg1, Result> = (arg0: Arg0, arg1: Arg1) => Result
export type ToFunction2<Arg0, Arg1, Result> = ((arg0: Arg0, arg1: Arg1) => Result) | Result
export function toFunction2<Arg0, Arg1, Result> (toFunc: ToFunction2<Arg0, Arg1, Result>): Function2<Arg0, Arg1, Result> {
    if (typeof toFunc === 'function') {
        return toFunc
    }
    return (arg0: Arg0, arg1: Arg1) => toFunc
}

export type AsyncFunction2<Arg0, Arg1, Result> = (arg0: Arg0, arg1: Arg1) => Promise<Result>
export type ToAsyncFunction2<Arg0, Arg1, Result> = ToFunction2<Arg0, Arg1, Promise<Result> | Result>
export function toAsyncFunction2<Arg0, Arg1, Result> (toFunc: ToAsyncFunction2<Arg0, Arg1, Result>): AsyncFunction2<Arg0, Arg1, Result> {
    const func = toFunction2(toFunc)
    return (arg0: Arg0, arg1: Arg1) => new Promise(resolve => resolve(func(arg0, arg1)))
}


export type Function3<Arg0, Arg1, Arg2, Result> = (arg0: Arg0, arg1: Arg1, arg2: Arg2) => Result
export type ToFunction3<Arg0, Arg1, Arg2, Result> = ((arg0: Arg0, arg1: Arg1, arg2: Arg2) => Result) | Result
export function toFunction3<Arg0, Arg1, Arg2, Result> (toFunc: ToFunction3<Arg0, Arg1, Arg2, Result>): Function3<Arg0, Arg1, Arg2, Result> {
    if (typeof toFunc === 'function') {
        return toFunc
    }
    return (arg0: Arg0, arg1: Arg1, arg2: Arg2) => toFunc
}

export type AsyncFunction3<Arg0, Arg1, Arg2, Result> = (arg0: Arg0, arg1: Arg1, arg2: Arg2) => Promise<Result>
export type ToAsyncFunction3<Arg0, Arg1, Arg2, Result> = ToFunction3<Arg0, Arg1, Arg2, Promise<Result> | Result>
export function toAsyncFunction3<Arg0, Arg1, Arg2, Result> (toFunc: ToAsyncFunction3<Arg0, Arg1, Arg2, Result>): AsyncFunction3<Arg0, Arg1, Arg2, Result> {
    const func = toFunction3(toFunc)
    return (arg0: Arg0, arg1: Arg1, arg2: Arg2) => new Promise(resolve => resolve(func(arg0, arg1, arg2)))
}


export type Function4<Arg0, Arg1, Arg2, Arg3, Result> = (arg0: Arg0, arg1: Arg1, arg2: Arg2, arg3: Arg3) => Result
export type ToFunction4<Arg0, Arg1, Arg2, Arg3, Result> = ((arg0: Arg0, arg1: Arg1, arg2: Arg2, arg3: Arg3) => Result) | Result
export function toFunction4<Arg0, Arg1, Arg2, Arg3, Result> (toFunc: ToFunction4<Arg0, Arg1, Arg2, Arg3, Result>): Function4<Arg0, Arg1, Arg2, Arg3, Result> {
    if (typeof toFunc === 'function') {
        return toFunc
    }
    return (arg0: Arg0, arg1: Arg1, arg2: Arg2, arg3: Arg3) => toFunc
}

export type AsyncFunction4<Arg0, Arg1, Arg2, Arg3, Result> = (arg0: Arg0, arg1: Arg1, arg2: Arg2, arg3: Arg3) => Promise<Result>
export type ToAsyncFunction4<Arg0, Arg1, Arg2, Arg3, Result> = ToFunction4<Arg0, Arg1, Arg2, Arg3, Promise<Result> | Result>
export function toAsyncFunction4<Arg0, Arg1, Arg2, Arg3, Result> (toFunc: ToAsyncFunction4<Arg0, Arg1, Arg2, Arg3, Result>): AsyncFunction4<Arg0, Arg1, Arg2, Arg3, Result> {
    const func = toFunction4(toFunc)
    return (arg0: Arg0, arg1: Arg1, arg2: Arg2, arg3: Arg3) => new Promise(resolve => resolve(func(arg0, arg1, arg2, arg3)))
}


export type Function5<Arg0, Arg1, Arg2, Arg3, Arg4, Result> = (arg0: Arg0, arg1: Arg1, arg2: Arg2, arg3: Arg3, arg4: Arg4) => Result
export type ToFunction5<Arg0, Arg1, Arg2, Arg3, Arg4, Result> = ((arg0: Arg0, arg1: Arg1, arg2: Arg2, arg3: Arg3, arg4: Arg4) => Result) | Result
export function toFunction5<Arg0, Arg1, Arg2, Arg3, Arg4, Result> (toFunc: ToFunction5<Arg0, Arg1, Arg2, Arg3, Arg4, Result>): Function5<Arg0, Arg1, Arg2, Arg3, Arg4, Result> {
    if (typeof toFunc === 'function') {
        return toFunc
    }
    return (arg0: Arg0, arg1: Arg1, arg2: Arg2, arg3: Arg3, arg4: Arg4) => toFunc
}

export type AsyncFunction5<Arg0, Arg1, Arg2, Arg3, Arg4, Result> = (arg0: Arg0, arg1: Arg1, arg2: Arg2, arg3: Arg3, arg4: Arg4) => Promise<Result>
export type ToAsyncFunction5<Arg0, Arg1, Arg2, Arg3, Arg4, Result> = ToFunction5<Arg0, Arg1, Arg2, Arg3, Arg4, Promise<Result> | Result>
export function toAsyncFunction5<Arg0, Arg1, Arg2, Arg3, Arg4, Result> (toFunc: ToAsyncFunction5<Arg0, Arg1, Arg2, Arg3, Arg4, Result>): AsyncFunction5<Arg0, Arg1, Arg2, Arg3, Arg4, Result> {
    const func = toFunction5(toFunc)
    return (arg0: Arg0, arg1: Arg1, arg2: Arg2, arg3: Arg3, arg4: Arg4) => new Promise(resolve => resolve(func(arg0, arg1, arg2, arg3, arg4)))
}


export type Function6<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Result> = (arg0: Arg0, arg1: Arg1, arg2: Arg2, arg3: Arg3, arg4: Arg4, arg5: Arg5) => Result
export type ToFunction6<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Result> = ((arg0: Arg0, arg1: Arg1, arg2: Arg2, arg3: Arg3, arg4: Arg4, arg5: Arg5) => Result) | Result
export function toFunction6<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Result> (toFunc: ToFunction6<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Result>): Function6<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Result> {
    if (typeof toFunc === 'function') {
        return toFunc
    }
    return (arg0: Arg0, arg1: Arg1, arg2: Arg2, arg3: Arg3, arg4: Arg4, arg5: Arg5) => toFunc
}

export type AsyncFunction6<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Result> = (arg0: Arg0, arg1: Arg1, arg2: Arg2, arg3: Arg3, arg4: Arg4, arg5: Arg5) => Promise<Result>
export type ToAsyncFunction6<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Result> = ToFunction6<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Promise<Result> | Result>
export function toAsyncFunction6<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Result> (toFunc: ToAsyncFunction6<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Result>): AsyncFunction6<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Result> {
    const func = toFunction6(toFunc)
    return (arg0: Arg0, arg1: Arg1, arg2: Arg2, arg3: Arg3, arg4: Arg4, arg5: Arg5) => new Promise(resolve => resolve(func(arg0, arg1, arg2, arg3, arg4, arg5)))
}


export type Function7<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Result> = (arg0: Arg0, arg1: Arg1, arg2: Arg2, arg3: Arg3, arg4: Arg4, arg5: Arg5, arg6: Arg6) => Result
export type ToFunction7<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Result> = ((arg0: Arg0, arg1: Arg1, arg2: Arg2, arg3: Arg3, arg4: Arg4, arg5: Arg5, arg6: Arg6) => Result) | Result
export function toFunction7<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Result> (toFunc: ToFunction7<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Result>): Function7<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Result> {
    if (typeof toFunc === 'function') {
        return toFunc
    }
    return (arg0: Arg0, arg1: Arg1, arg2: Arg2, arg3: Arg3, arg4: Arg4, arg5: Arg5, arg6: Arg6) => toFunc
}

export type AsyncFunction7<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Result> = (arg0: Arg0, arg1: Arg1, arg2: Arg2, arg3: Arg3, arg4: Arg4, arg5: Arg5, arg6: Arg6) => Promise<Result>
export type ToAsyncFunction7<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Result> = ToFunction7<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Promise<Result> | Result>
export function toAsyncFunction7<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Result> (toFunc: ToAsyncFunction7<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Result>): AsyncFunction7<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Result> {
    const func = toFunction7(toFunc)
    return (arg0: Arg0, arg1: Arg1, arg2: Arg2, arg3: Arg3, arg4: Arg4, arg5: Arg5, arg6: Arg6) => new Promise(resolve => resolve(func(arg0, arg1, arg2, arg3, arg4, arg5, arg6)))
}


export type Function8<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Arg7, Result> = (arg0: Arg0, arg1: Arg1, arg2: Arg2, arg3: Arg3, arg4: Arg4, arg5: Arg5, arg6: Arg6, arg7: Arg7) => Result
export type ToFunction8<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Arg7, Result> = ((arg0: Arg0, arg1: Arg1, arg2: Arg2, arg3: Arg3, arg4: Arg4, arg5: Arg5, arg6: Arg6, arg7: Arg7) => Result) | Result
export function toFunction8<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Arg7, Result> (toFunc: ToFunction8<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Arg7, Result>): Function8<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Arg7, Result> {
    if (typeof toFunc === 'function') {
        return toFunc
    }
    return (arg0: Arg0, arg1: Arg1, arg2: Arg2, arg3: Arg3, arg4: Arg4, arg5: Arg5, arg6: Arg6, arg7: Arg7) => toFunc
}

export type AsyncFunction8<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Arg7, Result> = (arg0: Arg0, arg1: Arg1, arg2: Arg2, arg3: Arg3, arg4: Arg4, arg5: Arg5, arg6: Arg6, arg7: Arg7) => Promise<Result>
export type ToAsyncFunction8<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Arg7, Result> = ToFunction8<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Arg7, Promise<Result> | Result>
export function toAsyncFunction8<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Arg7, Result> (toFunc: ToAsyncFunction8<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Arg7, Result>): AsyncFunction8<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Arg7, Result> {
    const func = toFunction8(toFunc)
    return (arg0: Arg0, arg1: Arg1, arg2: Arg2, arg3: Arg3, arg4: Arg4, arg5: Arg5, arg6: Arg6, arg7: Arg7) => new Promise(resolve => resolve(func(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7)))
}


export type Function9<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Arg7, Arg8, Result> = (arg0: Arg0, arg1: Arg1, arg2: Arg2, arg3: Arg3, arg4: Arg4, arg5: Arg5, arg6: Arg6, arg7: Arg7, arg8: Arg8) => Result
export type ToFunction9<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Arg7, Arg8, Result> = ((arg0: Arg0, arg1: Arg1, arg2: Arg2, arg3: Arg3, arg4: Arg4, arg5: Arg5, arg6: Arg6, arg7: Arg7, arg8: Arg8) => Result) | Result
export function toFunction9<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Arg7, Arg8, Result> (toFunc: ToFunction9<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Arg7, Arg8, Result>): Function9<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Arg7, Arg8, Result> {
    if (typeof toFunc === 'function') {
        return toFunc
    }
    return (arg0: Arg0, arg1: Arg1, arg2: Arg2, arg3: Arg3, arg4: Arg4, arg5: Arg5, arg6: Arg6, arg7: Arg7, arg8: Arg8) => toFunc
}

export type AsyncFunction9<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Arg7, Arg8, Result> = (arg0: Arg0, arg1: Arg1, arg2: Arg2, arg3: Arg3, arg4: Arg4, arg5: Arg5, arg6: Arg6, arg7: Arg7, arg8: Arg8) => Promise<Result>
export type ToAsyncFunction9<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Arg7, Arg8, Result> = ToFunction9<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Arg7, Arg8, Promise<Result> | Result>
export function toAsyncFunction9<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Arg7, Arg8, Result> (toFunc: ToAsyncFunction9<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Arg7, Arg8, Result>): AsyncFunction9<Arg0, Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Arg7, Arg8, Result> {
    const func = toFunction9(toFunc)
    return (arg0: Arg0, arg1: Arg1, arg2: Arg2, arg3: Arg3, arg4: Arg4, arg5: Arg5, arg6: Arg6, arg7: Arg7, arg8: Arg8) => new Promise(resolve => resolve(func(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8)))
}

