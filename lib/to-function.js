export function toFunction(toFunc) {
  if (typeof toFunc === 'function') return toFunc
  return function() {
    return toFunc
  }
}

export function toAsyncFunction(toFunc) {
  const func = toFunction(toFunc)
  return function() {
    return Promise.resolve(func.apply(this, arguments))
  }
}
