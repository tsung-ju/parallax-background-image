import { scheduler } from '@ray851107/dom-scheduler'

import { toElement, toElementArray } from './to-element'
import { loadBackgroundImage } from './background-image'
import { prependStyleSheet } from './style-sheet'

const CLASS_PARALLAX_VIEWPORT = 'parallax-background-image-viewport'
const CLASS_PARALLAX_VIEWPORT_3D = 'parallax-background-image-viewport-3d'
const CLASS_PARALLAX_ELEMENT = 'parallax-background-image-element'

initialize()

function initialize() {
  const styleSheet = prependStyleSheet()
  styleSheet.insertRule(
    `
    .${CLASS_PARALLAX_ELEMENT} {
      position: relative;
      overflow: hidden;
      background: none !important;
      background-image: none !important;
    }
  `,
    0
  )

  styleSheet.insertRule(
    `
    .${CLASS_PARALLAX_ELEMENT} > * {
      position: relative;
    }
  `,
    0
  )

  styleSheet.insertRule(
    `
    .${CLASS_PARALLAX_VIEWPORT} {
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
    }
  `,
    0
  )
  styleSheet.insertRule(
    `
    .${CLASS_PARALLAX_VIEWPORT_3D} {
      perspective: 1px;
      perspective-origin: center center;
      transform-style: flat;
    }
  `,
    0
  )
}

function getRect(element, ref = null) {
  const rect = element.getBoundingClientRect()
  const result = {
    x: (rect.left + rect.right) / 2,
    y: (rect.top + rect.bottom) / 2,
    w: rect.right - rect.left,
    h: rect.bottom - rect.top
  }
  if (ref != null) {
    result.x -= ref.x
    result.y -= ref.y
  }
  return result
}

export class ParallaxViewport {
  constructor(viewport, options) {
    this.viewport = toElement(viewport)
    this.options = options
    this.entries = []

    this.viewport.classList.add(CLASS_PARALLAX_VIEWPORT)
    if (options.use3d) this.viewport.classList.add(CLASS_PARALLAX_VIEWPORT_3D)

    this._observe()
  }

  _observe() {
    const loop = () => {
      const viewportRect = getRect(this.viewport)
      for (let i = 0; i < this.entries.length; ++i) {
        const { element, transform, renderer, initialBg } = this.entries[i]
        const elementRect = getRect(element, viewportRect)
        const bg = { ...initialBg }
        transform(bg, elementRect, viewportRect)
        renderer.render(bg)
      }
      scheduler.read(loop)
    }
    scheduler.read(loop)
  }

  add(elements, options = {}) {
    elements = toElementArray(elements, this.viewport)

    options = { ...this.options, ...options }

    return elements.map(element => {
      return loadBackgroundImage(element, options.backgroundImage).then(
        image => {
          this._addElement(element, image, options)
        }
      )
    })
  }

  _addElement(element, image, options) {
    this._removeElement(element)

    element.classList.add(CLASS_PARALLAX_ELEMENT)
    const transform = options.transform(element, image, options)
    const renderer = new options.renderer(element, image, options)
    const initialBg = {
      x: 0,
      y: 0,
      z: 0,
      w: image.naturalWidth,
      h: image.naturalHeight
    }

    this.entries.push({ element, transform, renderer, initialBg })
  }

  remove(elements) {
    toElementArray(elements).forEach(element => this._removeElement(element))
  }

  _removeElement(element) {
    let i = 0
    while (i < this.entries.length && this.entries[i].element !== element) ++i
    if (i === this.entries.length) return
    const entry = this.entries.splice(i, 1)[0]
    entry.element.classList.remove(CLASS_PARALLAX_ELEMENT)
    entry.renderer.dispose()
  }
}
