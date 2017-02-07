import {computed} from 'mobx'
import {ObservableBoundingClientRect} from './ObservableBoundingClientRect'

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
        this.boundingClientRect = new ObservableBoundingClientRect(element)
    }
    @computed get height (): number {
        return this.boundingClientRect.height
    }
    @computed get top (): number {
        return this.boundingClientRect.top
    }
}
