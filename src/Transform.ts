import {computed} from 'mobx'

import {ParallaxElement} from './ParallaxElement'
import {Background} from './Background'

export interface Transform {
    readonly scale: number
    readonly translateX: number
    readonly translateY: number
    readonly translateZ: number
}

export class ParallaxTransform implements Transform {
    readonly element: ParallaxElement
    readonly background: Background
    readonly velocityScale: number

    constructor (element: ParallaxElement, background: Background, velocityScale: number) {
        this.element = element
        this.background = background
        this.velocityScale = velocityScale
    }
    @computed get scale () {
        return 1 / this.velocityScale
    }
    @computed get translateX () {
        return this.element.left * (this.scale - 1)
    }    
    @computed get translateY () {
        const element = this.element
        const viewport = this.element.viewport
        return ((viewport.height - this.background.height) * this.scale - (viewport.height - element.height)) / 2
    }
    @computed get translateZ () {
        return this.element.viewport.perspective * (1 - this.scale)
    }
}

export function mapTransform (transform: Transform, patcher: Patcher): Transform {
    return new MapTransform(transform, patcher)
}

export type Patcher = (input: Transform) => Partial<Transform>

class MapTransform implements Transform {
    input: Transform
    patcher: Patcher
    constructor (input: Transform, patcher: Patcher) {
        this.input = input
        this.patcher = patcher
    }
    @computed get patched (): Transform {
        return Object.assign({}, this.input, this.patcher(this.input))
    }
    @computed get scale () {
        return this.patched.scale
    }
    @computed get translateX () {
        return this.patched.translateX
    }    
    @computed get translateY () {
        return this.patched.translateY
    }
    @computed get translateZ () {
        return this.patched.translateZ
    }
}
