import {computed} from 'mobx'

import {ParallaxElement} from './ParallaxElement'
import {Background} from './Background'

export interface Transform {
    readonly scale: number
    readonly translateX: number
    readonly translateY: number
    readonly translateZ: number
}

export function parallaxTransform (element: ParallaxElement, background: Background): Transform {
    const scale = 1 / element.velocityScale
    const viewport = element.viewport
    return {
        scale,
        translateX: element.left * (scale - 1),
        translateY: ((viewport.height - background.height) * scale - (viewport.height - element.height)) / 2,
        translateZ: viewport.perspective * (1 - scale)
    }
}

export function fallbackTransform (element: ParallaxElement, background: Background): Transform {
    const viewport = element.viewport
    const viewportCenter = viewport.top + viewport.height / 2
    const elementCenter = element.top + element.height / 2
    const backgroundCenter = element.top + background.height / 2
    return {
        scale: 1,
        translateX: 0,
        translateY: (elementCenter - viewportCenter) * (element.velocityScale - 1) - (backgroundCenter - elementCenter),
        translateZ: 0
    }
}

export function horizontalAlign (element: ParallaxElement, background: Background, value: number) {
    return (transform: Transform) => Object.assign({}, transform, {
        translateX: transform.translateX - (background.width - element.width) * transform.scale * value
    })
}
