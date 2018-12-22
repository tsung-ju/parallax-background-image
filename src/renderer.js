import { scheduler } from '@ray851107/dom-scheduler'
import { appendStyleSheet } from './style-sheet'

function renderToStyle(style) {
  scheduler.write(function() {
    style.position = 'absolute'
    style.left = '50%'
    style.top = '50%'
    style.transformOrigin = 'center center 0'
    style.pointerEvents = 'none'
  })

  return function render({ x, y, z, s }) {
    const css = `
      translate(-50%, -50%)
      translate3d(${x}px, ${y}px, ${z}px)
      scale(${s}, ${s})`

    scheduler.write(function() {
      style.transform = css
    })
  }
}

function dropRepeat(render) {
  let started = false
  let prev = null
  return function(t) {
    if (
      started &&
      t.x === prev.x &&
      t.y === prev.y &&
      t.z === prev.z &&
      t.s === prev.s
    )
      return
    started = true
    prev = t
    render(t)
  }
}

export class ImageElementRenderer {
  constructor(element, image, options) {
    this.element = element
    this.img = document.createElement('img')

    scheduler.write(() => {
      this.img.height = image.naturalHeight
      this.img.width = image.naturalWidth
      this.img.src = image.src
      this.element.prepend(this.img)
    })

    this.render = dropRepeat(renderToStyle(this.img.style))
  }

  dispose() {
    this.element.removeChild(this.img)
  }
}

const styleSheet = appendStyleSheet()
let nextId = 0
export class PseudoElementRenderer {
  constructor(element, image, options) {
    this.element = element
    const id = nextId++
    this.className = `parallax-background-image-pseudo-${id}`

    this.element.classList.add(this.className)

    const rule = `.${this.className}::before {
      content: '';
      width: ${image.naturalWidth}px;
      height: ${image.naturalHeight}px;
      background-image: url(${image.src});
      background-size: 100% 100%;
    }`

    const index = styleSheet.insertRule(rule, 0)
    const style = styleSheet.cssRules[index].style
    this.render = dropRepeat(renderToStyle(style))
  }
  dispose() {
    this.element.classList.remove(this.className)
  }
}
