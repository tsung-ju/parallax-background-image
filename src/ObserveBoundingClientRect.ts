import {observable, IObservableObject} from 'mobx'

export function observeBoundingClientRect (element: HTMLElement): ClientRect & IObservableObject {
    const boundingClientRect = observable(Object.assign({}, element.getBoundingClientRect()))
    function watch () {
        Object.assign(boundingClientRect, element.getBoundingClientRect())
        window.requestAnimationFrame(watch)
    }
    watch()
    return boundingClientRect
}
