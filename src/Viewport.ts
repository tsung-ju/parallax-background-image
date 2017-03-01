import {computed} from 'mobx'
import {ObservableRect, Rect} from './Rect'

export class Viewport {
    readonly element: HTMLElement
    readonly perspective: number
    readonly rect: Rect

    constructor (element: HTMLElement, perspective: number) {
        element.style.overflowY = 'scroll'
        element.style['webkitOverflowScrolling'] = 'touch'
        element.style.transformStyle = 'flat'

        if (perspective !== Infinity) {
            element.style.perspective = perspective + 'px'
            element.style.perspectiveOrigin = '0 0'
        }

        this.element = element
        this.perspective = perspective
        this.rect = new ObservableRect(element)
    }
}
