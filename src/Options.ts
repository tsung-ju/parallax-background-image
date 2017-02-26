import {ToBackgroundImage, getCSSBackgroundImage} from './BackgroundImage'
import {CreateBackground, insertImg, coverElement} from './Background'

export interface Options {
    velocityScale: number
    horizontalAlign: number
    backgroundImage: ToBackgroundImage
    createBackground: CreateBackground
}

export const defaultOptions: Options = {
    velocityScale: 0.8,
    horizontalAlign: 0.5,
    backgroundImage: getCSSBackgroundImage,
    createBackground: coverElement(insertImg)
}

export function fromPartial (options: Partial<Options>): Options {
    return Object.assign({}, defaultOptions, options)
}
