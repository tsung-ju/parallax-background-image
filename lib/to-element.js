export function toElement(element, parent) {
  if (typeof element === 'string') {
    return parent.querySelector(element)
  } else {
    return element
  }
}

export function toElementArray(elements, parent) {
  if (elements instanceof Element) {
    return [elements]
  } else {
    if (typeof elements === 'string') {
      elements = parent.querySelectorAll(elements)
    }
    return Array.prototype.slice.call(elements)
  }
}
