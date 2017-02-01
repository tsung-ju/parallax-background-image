import {ATTR_PARALLAX_ELEMENT} from './Constants'
import {appendStyleSheet} from './StyleSheet'

export interface State {
    scale: number
    translateX: number
    translateY: number
    translateZ: number
}

export const initialState: State = {
    scale: 1,
    translateX: 0,
    translateY: 0,
    translateZ: 0
}

export interface Background {
    update (patch: Partial<State>)
}

class StyleBackground implements Background {
    state: State
    style: CSSStyleDeclaration

    constructor (style: CSSStyleDeclaration) {
        this.state = initialState
        this.style = style

        Object.assign(style, {
            position: 'absolute',
            left: '0',
            top: '0',
            transformOrigin: '0 0 0',
            pointerEvents: 'none'
        })
    }

    update (patch: Partial<State>) {
        Object.assign(this.state, patch)
        this.style.transform = `
            translateX(${this.state.translateX}px)
            translateY(${this.state.translateY}px)
            translateZ(${this.state.translateZ}px)
            scale(${this.state.scale}, ${this.state.scale})`
    }
}

export type CreateBackground = (el: Element, image: HTMLImageElement) => Background

export const pseudoBefore: CreateBackground = (el: Element, image: HTMLImageElement) => {
    const rule = `[${ATTR_PARALLAX_ELEMENT}="${el.getAttribute(ATTR_PARALLAX_ELEMENT)}"]::before {
        content: '';
        width: ${image.naturalWidth}px;
        height: ${image.naturalHeight}px;
        background-image: url(${image.src});
        background-size: 100% 100%;
    }`

    const index = styleSheet.insertRule(rule, 0)

    return new StyleBackground((styleSheet.cssRules[index] as CSSStyleRule).style)
}

export const insertImg: CreateBackground = (el: Element, image: HTMLImageElement) => {
    const img = document.createElement('img')

    img.height = image.naturalHeight
    img.width = image.naturalWidth
    img.src = image.src

    el.insertBefore(img, el.firstElementChild)
    return new StyleBackground(img.style)
}

const styleSheet: CSSStyleSheet = appendStyleSheet()
