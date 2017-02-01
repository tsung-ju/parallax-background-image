export type ToElement<T extends Element> = string | T
export function toElement<T extends Element> (element: ToElement<T>, parent: NodeSelector = document): T {
    if (typeof element === 'string') {
        return parent.querySelector(element) as T
    } else {
        return element
    }
}

export type ToElementArray<T extends Element> = string | T | T[] | NodeListOf<T>
export function toElementArray<T extends Element> (elements: ToElementArray<T>, parent: NodeSelector = document): T[] {
    if (elements instanceof Element) {
        return [elements]
    } else if (Array.isArray(elements)) {
        return elements
    } else {
        if (typeof elements === 'string') {
            elements = parent.querySelectorAll(elements) as NodeListOf<T>
        }
        return Array.prototype.slice.call(elements)
    }
}