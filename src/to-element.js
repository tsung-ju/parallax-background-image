export function toElement(element, parent = document) {
  if (typeof element === 'string') return parent.querySelector(element)
  else return element
}

export function toElementArray(elements, parent = document) {
  if (elements instanceof Element) return [elements]
  if (typeof elements === 'string') elements = parent.querySelectorAll(elements)
  return Array.prototype.slice.call(elements)
}
