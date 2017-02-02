import {computed} from 'mobx'

import {ATTR_PARALLAX_ELEMENT} from './Constants'
import {Viewport} from './Viewport'
import {observeBoundingClientRect} from './ObserveBoundingClientRect'

export class ParallaxElement {
    readonly id: string
    readonly element: HTMLElement
    readonly boundingClientRect: ClientRect
    readonly viewport: Viewport

    constructor (element: HTMLElement, viewport: Viewport) {
        this.id = ParallaxElement.getNextId()
        this.element = element
        this.boundingClientRect = observeBoundingClientRect(element)
        this.viewport = viewport

        this.element.setAttribute(ATTR_PARALLAX_ELEMENT, this.id)
    }

    @computed get width () {
        return this.boundingClientRect.width
    }
    @computed get height () {
        return this.boundingClientRect.height
    }
    @computed get left () {
        return this.boundingClientRect.left
    }

    private static nextId = 0
    private static getNextId (): string {
        return `${ParallaxElement.nextId++}`
    }
}
