import {ATTR_PARALLAX_ELEMENT} from './Constants'
import {ToElement, ToElementArray, toElementArray} from './ToElement'
import {loadBackgroundImage} from './BackgroundImage'
import {Options, fromPartial} from './Options'
import {prependStyleSheet} from './StyleSheet'
import {Viewport} from './Viewport'

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
    viewport: Viewport

    constructor (element: ToElement<HTMLElement>, perspective: number = 1000) {
        this.viewport = new Viewport(element, perspective)
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
        element.setAttribute(ATTR_PARALLAX_ELEMENT, getNextElementId())

        const background = options.createBackground(element, image)

        type Params = [number, number, number, number]

        const getParams: () => Params = () => {
            const {width: elementWidth, height: elementHeight, left} = element.getBoundingClientRect()
            const viewportHeight = this.viewport.height
            return [elementWidth, elementHeight, left, viewportHeight]
        }

        watchChange<Params>(getParams, ([elementWidth, elementHeight, left, viewportHeight]) => {
            const minimalHeight = calcMinimalHeight({ viewportHeight, velocityScale: options.velocityScale, elementHeight })
            const minimalWidth = elementWidth

            const baseScale = coverScale({
                height: image.naturalHeight,
                width: image.naturalWidth,
                minimalHeight,
                minimalWidth})
            
            const backgroundHeight = baseScale * image.naturalHeight

            const scale = 1 / options.velocityScale

            background.update({
                translateX: left * (scale - 1),
                translateY: ((viewportHeight - backgroundHeight) * scale - (viewportHeight - elementHeight)) / 2,
                translateZ: this.viewport.perspective * (1 - scale),
                scale: baseScale * scale
            })
        })
    }
}

const getNextElementId = (function () {
    let nextId = 0
    return () => `${nextId++}`
}())

function watchChange<T extends any[]> (getParams: () => T, action: (params: T) => any) {
    let cache = []
    function watch() {
        const newParams = getParams()
        if (newParams.some((param, i) => cache[i] !== param)) {
            cache = newParams
            action(newParams)
        }
    }
    window.requestAnimationFrame(watch)
}

function calcMinimalHeight ({ viewportHeight, elementHeight, velocityScale }) {
    const coverElementTop = velocityScale > 0
        ? elementHeight + (velocityScale - 1) * (viewportHeight + elementHeight)
        : elementHeight + (1 - velocityScale) * (viewportHeight - elementHeight)
    const coverWindowTop = viewportHeight + velocityScale * (viewportHeight - elementHeight)

    return Math.max(coverElementTop, coverWindowTop)
}

function coverScale ({ width, height, minimalWidth, minimalHeight }) {
    return Math.max(minimalHeight / height, minimalWidth / width)
}