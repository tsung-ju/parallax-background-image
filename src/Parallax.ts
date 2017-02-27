import {autorun} from 'mobx'

import {ATTR_PARALLAX_ELEMENT} from './Constants'
import {ToElement, toElement, ToElementArray, toElementArray} from './ToElement'
import {getCSSBackgroundImage, loadBackgroundImage} from './BackgroundImage'
import {Options, fromPartial} from './Options'
import {prependStyleSheet} from './StyleSheet'
import {Viewport} from './Viewport'
import {ParallaxElement} from './ParallaxElement'
import {Background, coverElement, pseudoBefore, insertImg} from './Background'
import {Transform, parallaxTransform, fallbackTransform, horizontalAlign} from './Transform'
import {scheduler} from '@ray851107/dom-scheduler'

initialize()

function initialize () {
    const styleSheet = prependStyleSheet()
    styleSheet.insertRule(`
        [${ATTR_PARALLAX_ELEMENT}] > * {
            position: relative;
        }
    `, 0)

    styleSheet.insertRule(`
        [${ATTR_PARALLAX_ELEMENT}] {
            position: relative;
            overflow: hidden;
        }
    `, 0)
}

export class Parallax {
    static getCSSBackgroundImage = getCSSBackgroundImage
    static pesudoBefore = pseudoBefore
    static insertImg = insertImg
    static coverElement = coverElement

    viewport: Viewport
    useFallback: boolean

    constructor (element: ToElement<HTMLElement>, useFallback = !isChrome(), perspective: number = 1000) {
        if (useFallback) {
            perspective = Infinity
        }
        this.useFallback = useFallback
        this.viewport = new Viewport(toElement(element), perspective)
    }

    add (elements: ToElementArray<HTMLElement>, partial: Partial<Options> = {}): Promise<null>[] {
        const options = fromPartial(partial)

        if (options.velocityScale < 0) throw new RangeError('velocityScale must be positive')

        return toElementArray(elements, this.viewport.element)
            .filter(element => !element.hasAttribute(ATTR_PARALLAX_ELEMENT))
            .map(element => this.addElement(element, options))
    }

    async addElement (element: HTMLElement, options: Options) {
        const image = await loadBackgroundImage(element, options.backgroundImage)

        const parallaxElement = new ParallaxElement(element, this.viewport, options.velocityScale)

        removeBackground(element)

        const background = options.createBackground(parallaxElement, image)
        const getTransform = this.useFallback ? fallbackTransform : parallaxTransform
        const align = horizontalAlign(parallaxElement, background, options.horizontalAlign)
        autorun(() => {
            const transform = getTransform(parallaxElement, background)
            background.updateTransform(align(transform))
        })
    }
}

function isChrome () {
    const {userAgent} = navigator
    return userAgent.includes('Chrome/') && ! userAgent.includes('Edge/')
}

function removeBackground (element: HTMLElement) {
    element.style.setProperty('background', 'none', 'important')
    element.style.setProperty('background-image', 'none', 'important')
}