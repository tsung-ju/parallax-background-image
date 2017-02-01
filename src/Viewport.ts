import {ToElement, toElement} from './ToElement'

export class Viewport {
    element: Readonly<HTMLElement>
    perspective: Readonly<number>

    constructor (element: ToElement<HTMLElement>, perspective: number) {
        element = toElement(element)

        Object.assign(element.style, {
            overflowY: 'scroll',
            transformStyle: 'flat',
            perspective: perspective + 'px',
            perspectiveOrigin: '0 0'
        })

        this.element = element
        this.perspective = perspective
    }

    get height (): number {
        return this.element.getBoundingClientRect().height
    }
}
