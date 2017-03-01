import {computed} from 'mobx'

import {ATTR_PARALLAX_ELEMENT} from './Constants'
import {Viewport} from './Viewport'
import {Rect, ObservableRect} from './Rect'
import {scheduler} from '@ray851107/dom-scheduler'

export class ParallaxElement {
    readonly id: string
    readonly element: HTMLElement
    readonly rect: Rect
    readonly viewport: Viewport
    readonly velocityScale: number

    constructor (element: HTMLElement, viewport: Viewport, velocityScale: number) {
        this.id = ParallaxElement.getNextId()
        this.element = element
        this.rect = new ObservableRect(element)
        this.viewport = viewport
        this.velocityScale = velocityScale
        
        scheduler.write(() => {
            this.element.setAttribute(ATTR_PARALLAX_ELEMENT, this.id)
        })
    }

    private static nextId = 0
    private static getNextId (): string {
        return `${ParallaxElement.nextId++}`
    }
}
