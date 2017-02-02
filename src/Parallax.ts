import {ATTR_PARALLAX_ELEMENT} from './Constants'
import {ToElement, toElement, ToElementArray, toElementArray} from './ToElement'
import {loadBackgroundImage} from './BackgroundImage'
import {Options, fromPartial} from './Options'
import {prependStyleSheet} from './StyleSheet'
import {Viewport} from './Viewport'
import {ParallaxElement} from './ParallaxElement'
import {ParallaxTransform} from './Transform'

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

        const parallaxElement = new ParallaxElement(element, this.viewport)

        const background = options.createBackground(parallaxElement, image, options.velocityScale)
        background.setTransform(new ParallaxTransform(parallaxElement, background, options.velocityScale))
    }
}
