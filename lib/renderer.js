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
    const { scheduler } = options
    const img = document.createElement('img')
    const style = img.style

    const src = image.src
    const width = image.naturalWidth
    const height = image.naturalHeight

    scheduler.write(function() {
      img.src = src
      element.prepend(img)
      setupStyle(style, width, height)
    })

    this.element = element
    this.img = img
    this.render = renderToStyle(style, width, height)
  }

  dispose() {
    this.element.removeChild(this.img)
  }
}

const styleSheet = appendStyleSheet()
let nextId = 0
export class PseudoElementRenderer {
  constructor(element, image, options) {
    const { scheduler } = options
    this.element = element
    const id = nextId++
    this.className = `parallax-background-image-pseudo-${id}`

    this.element.classList.add(this.className)

    const rule = `.${this.className}::before {}`
    const index = styleSheet.insertRule(rule, 0)
    const style = styleSheet.cssRules[index].style

    const src = image.src
    const width = image.naturalWidth
    const height = image.naturalHeight
    scheduler.write(function() {
      style.content = ''
      style.backgroundImage = `url(${src})`
      style.backgroundSize = '100% 100%'
      setupStyle(style, width, height)
    })

    this.render = renderToStyle(style, width, height)
  }
  dispose() {
    this.element.classList.remove(this.className)
  }
}
