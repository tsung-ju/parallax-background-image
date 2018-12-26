import { ParallaxElement } from './parallax-element'
import { CLASS_PARALLAX_VIEWPORT, CLASS_PARALLAX_VIEWPORT_3D } from './style'
import { toElement, toElementArray } from './to-element'
import { loadImage } from './load-image'

function getRect(element) {
  const rect = element.getBoundingClientRect()
  return {
    x: (rect.left + rect.right) / 2,
    y: (rect.top + rect.bottom) / 2,
    w: rect.right - rect.left,
    h: rect.bottom - rect.top
  }
}

function subtract_(a, b) {
  a.x -= b.x
  a.y -= b.y
}

export class ParallaxViewport {
  constructor(viewport, options) {
    this.viewport = toElement(viewport, document)
    this.options = options
    this.elements = []

    this._setupStyle()
    this._monitorRects()
    this._startRenderLoop()
  }

  _setupStyle() {
    this.viewport.classList.add(CLASS_PARALLAX_VIEWPORT)
    if (this.options.use3d) {
      this.viewport.classList.add(CLASS_PARALLAX_VIEWPORT_3D)
    }
  }

  _monitorRects() {
    const _updateRects = this._updateRects.bind(this)
    window.addEventListener('resize', _updateRects)
    if (!this.options.use3d) {
      this.viewport.addEventListener('scroll', _updateRects)
    }
  }

  _updateRects() {
    const viewportRect = getRect(this.viewport)
    for (let i = 0; i < this.elements.length; ++i) {
      const parallaxElement = this.elements[i]
      const elementRect = getRect(parallaxElement.element)
      subtract_(elementRect, viewportRect)
      parallaxElement.updateRect(elementRect, viewportRect)
    }
  }

  _startRenderLoop() {
    const elements = this.elements
    function renderLoop() {
      for (let i = 0; i < elements.length; ++i) {
        elements[i].render()
      }
      window.requestAnimationFrame(renderLoop)
    }
    window.requestAnimationFrame(renderLoop)
  }

  add(elements, options = {}) {
    elements = toElementArray(elements, this.viewport)

    options = { ...this.options, ...options }

    return elements.map(element => {
      return loadImage(options.image, element).then(image => {
        this.elements.push(new ParallaxElement(element, image, options))
        this._updateRects()
      })
    })
  }

  remove(elements) {
    elements = toElementArray(elements, document)
    for (let i = 0; i < elements.length; ++i) {
      this._removeElement(element)
    }
  }

  _removeElement(element) {
    for (let i = 0; i < this.elements.length; ++i) {
      if (this.elements[i].element === element) {
        this.elements[i].dispose()
        this.elements.splice(i, 1)
        return
      }
    }
  }
}
