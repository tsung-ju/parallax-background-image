import {computed} from 'mobx'

import {ATTR_PARALLAX_ELEMENT} from './Constants'
import {Viewport} from './Viewport'
import {ObservableBoundingClientRect} from './ObservableBoundingClientRect'

export class ParallaxElement {
    readonly id: string
    readonly element: HTMLElement
    readonly boundingClientRect: ClientRect
    readonly viewport: Viewport

    constructor (element: HTMLElement, viewport: Viewport) {
        this.id = ParallaxElement.getNextId()
        this.element = element
        this.boundingClientRect = new ObservableBoundingClientRect(element)
        this.viewport = viewport

        this.element.setAttribute(ATTR_PARALLAX_ELEMENT, this.id)
    }

    @computed get width (): number {
        return this.boundingClientRect.width
    }
    @computed get height (): number {
        return this.boundingClientRect.height
    }
    @computed get left (): number {
        return this.boundingClientRect.left
    }
    @computed get top (): number {
        return this.boundingClientRect.top
    }
    private static nextId = 0
    private static getNextId (): string {
        return `${ParallaxElement.nextId++}`
    }
}
