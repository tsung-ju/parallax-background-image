import {computed} from 'mobx'
import {observeBoundingClientRect} from './ObserveBoundingClientRect'

export class Viewport {
    readonly element: HTMLElement
    readonly perspective: number
    readonly boundingClientRect: ClientRect

    constructor (element: HTMLElement, perspective: number) {
        Object.assign(element.style, {
            overflowY: 'scroll',
            transformStyle: 'flat',
            perspective: perspective + 'px',
            perspectiveOrigin: '0 0'
        })

        this.element = element
        this.perspective = perspective
        this.boundingClientRect = observeBoundingClientRect(element)
    }
    @computed get height () {
        return this.boundingClientRect.height
    }
}
