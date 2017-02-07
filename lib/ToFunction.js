export function toFunction0(toFunc) {
    if (typeof toFunc === 'function') {
        return toFunc;
    }
    return () => toFunc;
}
export function toAsyncFunction0(toFunc) {
    const func = toFunction0(toFunc);
    return () => new Promise(resolve => resolve(func()));
}
export function toFunction1(toFunc) {
    if (typeof toFunc === 'function') {
        return toFunc;
    }
    return (arg0) => toFunc;
}
export function toAsyncFunction1(toFunc) {
    const func = toFunction1(toFunc);
    return (arg0) => new Promise(resolve => resolve(func(arg0)));
}
export function toFunction2(toFunc) {
    if (typeof toFunc === 'function') {
        return toFunc;
    }
    return (arg0, arg1) => toFunc;
}
export function toAsyncFunction2(toFunc) {
    const func = toFunction2(toFunc);
    return (arg0, arg1) => new Promise(resolve => resolve(func(arg0, arg1)));
}
export function toFunction3(toFunc) {
    if (typeof toFunc === 'function') {
        return toFunc;
    }
    return (arg0, arg1, arg2) => toFunc;
}
export function toAsyncFunction3(toFunc) {
    const func = toFunction3(toFunc);
    return (arg0, arg1, arg2) => new Promise(resolve => resolve(func(arg0, arg1, arg2)));
}
export function toFunction4(toFunc) {
    if (typeof toFunc === 'function') {
        return toFunc;
    }
    return (arg0, arg1, arg2, arg3) => toFunc;
}
export function toAsyncFunction4(toFunc) {
    const func = toFunction4(toFunc);
    return (arg0, arg1, arg2, arg3) => new Promise(resolve => resolve(func(arg0, arg1, arg2, arg3)));
}
export function toFunction5(toFunc) {
    if (typeof toFunc === 'function') {
        return toFunc;
    }
    return (arg0, arg1, arg2, arg3, arg4) => toFunc;
}
export function toAsyncFunction5(toFunc) {
    const func = toFunction5(toFunc);
    return (arg0, arg1, arg2, arg3, arg4) => new Promise(resolve => resolve(func(arg0, arg1, arg2, arg3, arg4)));
}
export function toFunction6(toFunc) {
    if (typeof toFunc === 'function') {
        return toFunc;
    }
    return (arg0, arg1, arg2, arg3, arg4, arg5) => toFunc;
}
export function toAsyncFunction6(toFunc) {
    const func = toFunction6(toFunc);
    return (arg0, arg1, arg2, arg3, arg4, arg5) => new Promise(resolve => resolve(func(arg0, arg1, arg2, arg3, arg4, arg5)));
}
export function toFunction7(toFunc) {
    if (typeof toFunc === 'function') {
        return toFunc;
    }
    return (arg0, arg1, arg2, arg3, arg4, arg5, arg6) => toFunc;
}
export function toAsyncFunction7(toFunc) {
    const func = toFunction7(toFunc);
    return (arg0, arg1, arg2, arg3, arg4, arg5, arg6) => new Promise(resolve => resolve(func(arg0, arg1, arg2, arg3, arg4, arg5, arg6)));
}
export function toFunction8(toFunc) {
    if (typeof toFunc === 'function') {
        return toFunc;
    }
    return (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) => toFunc;
}
export function toAsyncFunction8(toFunc) {
    const func = toFunction8(toFunc);
    return (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) => new Promise(resolve => resolve(func(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7)));
}
export function toFunction9(toFunc) {
    if (typeof toFunc === 'function') {
        return toFunc;
    }
    return (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) => toFunc;
}
export function toAsyncFunction9(toFunc) {
    const func = toFunction9(toFunc);
    return (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) => new Promise(resolve => resolve(func(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8)));
}
