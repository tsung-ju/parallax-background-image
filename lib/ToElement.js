export function toElement(element, parent) {
    if (parent === void 0) { parent = document; }
    if (typeof element === 'string') {
        return parent.querySelector(element);
    }
    else {
        return element;
    }
}
export function toElementArray(elements, parent) {
    if (parent === void 0) { parent = document; }
    if (elements instanceof Element) {
        return [elements];
    }
    else if (Array.isArray(elements)) {
        return elements;
    }
    else {
        if (typeof elements === 'string') {
            elements = parent.querySelectorAll(elements);
        }
        return Array.prototype.slice.call(elements);
    }
}
