import { appendStyleSheet } from './style-sheet'

function setupStyle(style, width, height) {
  style.position = 'absolute'
  style.left = '50%'
  style.top = '50%'
  style.width = `${width}px`
  style.height = `${height}px`
  style.transformOrigin = 'center center 0'
  style.pointerEvents = 'none'
}

function renderToStyle(style, width, height) {
  return function render({ x, y, z, w, h }) {
    style.transform =
      `translate(-50%, -50%)` +
      `translate3d(${x}px, ${y}px, ${z}px)` +
      `scale(${w / width}, ${h / height})`
  }
}

export class ImageElementRenderer {
  constructor(element, image, options) {
    this.element = element
    this.img = document.createElement('img')

    const style = this.img.style
    const width = image.naturalWidth
    const height = image.naturalHeight

    window.requestAnimationFrame(() => {
      this.img.src = image.src
      setupStyle(style, width, height)
      this.element.prepend(this.img)
    })

    this.render = renderToStyle(style, width, height)
  }

  dispose() {
    this.element.removeChild(this.img)
  }
}

function createStyle(selector, styleSheet) {
  const rule = `${selector} {}`
  const index = styleSheet.insertRule(rule, 0)
  return styleSheet.cssRules[index].style
}

const styleSheet = appendStyleSheet()
let nextId = 0
export class PseudoElementRenderer {
  constructor(element, image, options) {
    this.element = element
    const id = nextId++
    this.className = `parallax-background-image-pseudo-${id}`

    const style = createStyle(`.${this.className}::before`, styleSheet)
    const width = image.naturalWidth
    const height = image.naturalHeight

    window.requestAnimationFrame(() => {
      style.content = '""'
      style.backgroundImage = `url(${image.src})`
      style.backgroundSize = '100% 100%'
      setupStyle(style, width, height)
      this.element.classList.add(this.className)
    })

    this.render = renderToStyle(style, width, height)
  }

  dispose() {
    this.element.classList.remove(this.className)
  }
}
