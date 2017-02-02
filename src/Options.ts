import {ToBackgroundImage, getCSSBackgroundImage} from './BackgroundImage'
import {CreateBackground, pseudoBefore, coverElement} from './Background'

export interface Options {
    velocityScale: number
    translateX: number
    translateY: number
    backgroundImage: ToBackgroundImage
    createBackground: CreateBackground
}

export const defaultOptions: Options = {
    velocityScale: 0.8,
    translateX: 0,
    translateY: 0,
    backgroundImage: getCSSBackgroundImage,
    createBackground: coverElement(pseudoBefore)
}

export function fromPartial (options: Partial<Options>): Options {
    return Object.assign({}, defaultOptions, options)
}
