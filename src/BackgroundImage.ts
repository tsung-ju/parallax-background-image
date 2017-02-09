import {ToAsyncFunction1, toAsyncFunction} from './ToFunction'

export type ToBackgroundImage = ToAsyncFunction1<Element, string>

export function loadBackgroundImage (el: Element, getImage: ToBackgroundImage): Promise<HTMLImageElement> {
    return toAsyncFunction(getImage)(el).then(loadImage)
}

function loadImage (src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const image = document.createElement('img')
        image.onload = (event) => {
            resolve(event.target)
        }
        image.onerror = (event) => {
            reject(event.error)
        }
        image.src = src
    })
}

export const getCSSBackgroundImage: ToBackgroundImage = (el: Element) => {
    const style = window.getComputedStyle(el)
    return parseCSSUrl(style.backgroundImage)
}

function parseCSSUrl (str: string): string {
    return str.match(/url\(['"]?(.*?)['"]?\)/)[1]
}
