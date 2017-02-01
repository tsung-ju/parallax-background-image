import {ToBackgroundImage, getCSSBackgroundImage} from './BackgroundImage'
import {CreateBackground, pseudoBefore, insertImg} from './Background'

export interface Options {
    velocityScale: number
    translateX: number
    translateY: number
    backgroundImage: ToBackgroundImage
    createBackground: CreateBackground
}

export const defaultOptions = {
    velocityScale: 0.8,
    translateX: 0,
    translateY: 0,
    backgroundImage: getCSSBackgroundImage,
    createBackground: pseudoBefore
}

export function fromPartial (options: Partial<Options>): Options {
    return Object.assign({}, defaultOptions, options)
}
