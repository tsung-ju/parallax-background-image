import {computed} from 'mobx'

import {ParallaxElement} from './ParallaxElement'
import {Background} from './Background'

export interface Transform {
    readonly scale: number
    readonly translateX: number
    readonly translateY: number
    readonly translateZ: number
}

export function parallaxTransform (element: ParallaxElement, background: Background, velocityScale: number): Transform {
    const scale = 1 / velocityScale
    const viewport = element.viewport
    return {
        scale,
        translateX: element.left * (scale - 1),
        translateY: ((viewport.height - background.height) * scale - (viewport.height - element.height)) / 2,
        translateZ: viewport.perspective * (1 - scale)
    }
}
