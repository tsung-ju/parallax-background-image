let range

range = []
for (let i = 0; i < 10; i++) {
    let types = (r) => range.map(j => `Arg${j}, `).join('') + r
    let argTypes = range.map(j => `arg${j}: Arg${j}`).join(', ')
    let args = range.map(j => `arg${j}`).join(', ')
    console.log(`
export type Function${i}<${types('Result')}> = (${argTypes}) => Result
export type ToFunction${i}<${types('Result')}> = ((${argTypes}) => Result) | Result
export type AsyncFunction${i}<${types('Result')}> = (${argTypes}) => Promise<Result>
export type ToAsyncFunction${i}<${types('Result')}> = ToFunction${i}<${types('Promise<Result> | Result')}>`)
    range.push(i)
}

range = []
for (let i = 0; i < 10; i++) {
    let types = (r) => range.map(j => `Arg${j}, `).join('') + r
    let argTypes = range.map(j => `arg${j}: Arg${j}`).join(', ')
    let args = range.map(j => `arg${j}`).join(', ')
    console.log(`export function toFunction<${types('Result')}> (toFunc: ToFunction${i}<${types('Result')}>): Function${i}<${types('Result')}>;`)
    range.push(i)
}
console.log(`export function toFunction (toFunc) {
    if (typeof toFunc === 'function') {
        return toFunc
    }
    return () => toFunc
}`)

range = []
for (let i = 0; i < 10; i++) {
    let types = (r) => range.map(j => `Arg${j}, `).join('') + r
    let argTypes = range.map(j => `arg${j}: Arg${j}`).join(', ')
    let args = range.map(j => `arg${j}`).join(', ')
    console.log(`export function toAsyncFunction<${types('Result')}> (toFunc: ToAsyncFunction${i}<${types('Result')}>): AsyncFunction${i}<${types('Result')}>;`)
    range.push(i)
}

console.log(`export function toAsyncFunction (toFunc) {
    const func = toFunction(toFunc)
    return function () { return new Promise(resolve => resolve(func.apply(this, arguments))) }
}`)