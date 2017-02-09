import {action, computed, observable, autorun} from 'mobx'

import {ATTR_PARALLAX_ELEMENT} from './Constants'
import {appendStyleSheet} from './StyleSheet'
import {ParallaxElement} from './ParallaxElement'
import {Transform} from './Transform'
import {scheduler} from './Scheduler'

export interface Background {
    readonly width: number
    readonly height: number
    
    updateTransform (transform: Transform)
}

class StyleBackground implements Background {
    readonly style: CSSStyleDeclaration
    readonly width: number
    readonly height: number
    
    constructor (style: CSSStyleDeclaration, width: number, height: number) {
        this.style = style
        this.width = width
        this.height = height

        Object.assign(style, {
            position: 'absolute',
            left: '0',
            top: '0',
            transformOrigin: '0 0 0',
            pointerEvents: 'none'
        })
    }

    updateTransform (transform: Transform) {
        scheduler.write(() => {
            this.style.transform = `
                translateX(${transform.translateX}px)
                translateY(${transform.translateY}px)
                translateZ(${transform.translateZ}px)
                scale(${transform.scale}, ${transform.scale})`
        })
    }
}

export abstract class ScaleBackground implements Background {
    background: Background
    abstract readonly scale: number

    constructor (background: Background) {
        this.background = background
    }
    updateTransform (transform: Transform) {
        this.background.updateTransform(Object.assign({}, transform, {
            scale: transform.scale * this.scale
        }))
    }
    @computed get height (): number {
        return this.background.height * this.scale
    }
    @computed get width (): number {
        return this.background.width * this.scale
    }
}

export class CoverScaleBackground extends ScaleBackground {
    element: ParallaxElement
    
    constructor (background: Background, coveredElement: ParallaxElement) {
        super(background)
        this.element = coveredElement
    }

    @computed get scale (): number {
        return Math.max(this.minimalHeight / this.background.height, this.minimalWidth / this.background.width)
    }

    @computed get minimalHeight (): number {
        const { height: viewportHeight } = this.element.viewport
        const { height: elementHeight, velocityScale } = this.element

        const coverElementTop = velocityScale > 1
            ? elementHeight + (velocityScale - 1) * (viewportHeight + elementHeight)
            : elementHeight + (1 - velocityScale) * (viewportHeight - elementHeight)

        const coverWindowTop = viewportHeight + velocityScale * (viewportHeight - elementHeight)

        return Math.max(coverElementTop, coverWindowTop)
    }

    @computed get minimalWidth (): number {
        return this.element.width
    }
}

export type CreateBackground = (el: ParallaxElement, image: HTMLImageElement) => Background

export function coverElement(createBackground: CreateBackground, coveredElement: ParallaxElement=null): CreateBackground {
    return (el: ParallaxElement, image: HTMLImageElement) => {
        coveredElement = coveredElement || el
        const background = createBackground(el, image)
        return new CoverScaleBackground(background, coveredElement)
    }
}

export const pseudoBefore: CreateBackground = (el: ParallaxElement, image: HTMLImageElement) => {
    const rule = `[${ATTR_PARALLAX_ELEMENT}="${el.id}"]::before {
        content: '';
        width: ${image.naturalWidth}px;
        height: ${image.naturalHeight}px;
        background-image: url(${image.src});
        background-size: 100% 100%;
    }`

    const index = styleSheet.insertRule(rule, 0)

    const style = (styleSheet.cssRules[index] as CSSStyleRule).style

    return new StyleBackground(style, image.naturalWidth, image.naturalHeight)
}

export const insertImg: CreateBackground = (el: ParallaxElement, image: HTMLImageElement) => {
    const img = document.createElement('img')

    img.height = image.naturalHeight
    img.width = image.naturalWidth
    img.src = image.src

    el.element.insertBefore(img, el.element.firstElementChild)
    return new StyleBackground(img.style, image.naturalWidth, image.naturalHeight)
}

const styleSheet: CSSStyleSheet = appendStyleSheet()
