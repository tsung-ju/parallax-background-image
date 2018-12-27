import { ParallaxElement } from './parallax-element'
import { CLASS_PARALLAX_VIEWPORT, CLASS_PARALLAX_VIEWPORT_3D } from './style'
import { loadImage } from './load-image'

export class ParallaxViewport {
  constructor(rootElement, options) {
    if (typeof rootElement === 'string') {
      rootElement = document.querySelector(rootElement)
    }

    this.rootElement = rootElement
    this.options = options
    this.parallaxElements = []

    this._setupStyle()
    this._monitorRects()
    this._startRenderLoop()
  }

  add(elements, options = {}) {
    options = Object.assign({}, this.options, options)
    elements = toElementArray(elements, this.rootElement)
    elements = elements.filter(element => this._isViewportFor(element))

    return elements.map(element => {
      return loadImage(options.image, element).then(image => {
        this.parallaxElements.push(new ParallaxElement(element, image, options))
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

  _setupStyle() {
    this.rootElement.classList.add(CLASS_PARALLAX_VIEWPORT)
    if (this.options.use3d) {
      this.rootElement.classList.add(CLASS_PARALLAX_VIEWPORT_3D)
    }
  }

  _monitorRects() {
    const _updateRects = this._updateRects.bind(this)
    window.addEventListener('resize', _updateRects)
    if (!this.options.use3d) {
      this.rootElement.addEventListener('scroll', _updateRects)
    }
  }

  _updateRects() {
    const parallaxElements = this.parallaxElements
    const viewportRect = getRect(this.rootElement)
    for (let i = 0; i < parallaxElements.length; ++i) {
      const elementRect = getRect(parallaxElements[i].element)
      subtract_(elementRect, viewportRect)
      parallaxElements[i].updateRect(elementRect, viewportRect)
    }
  }

  _startRenderLoop() {
    const parallaxElements = this.parallaxElements
    function renderLoop() {
      for (let i = 0; i < parallaxElements.length; ++i) {
        parallaxElements[i].render()
      }
      window.requestAnimationFrame(renderLoop)
    }
    window.requestAnimationFrame(renderLoop)
  }

  _isViewportFor(element) {
    return (
      element !== this.rootElement &&
      element.closest(`.${CLASS_PARALLAX_VIEWPORT}`) === this.rootElement
    )
  }

  _removeElement(element) {
    const parallaxElements = this.parallaxElements
    for (let i = 0; i < parallaxElements.length; ++i) {
      if (this.parallaxElements[i].element === element) {
        parallaxElements[i].dispose()
        parallaxElements.splice(i, 1)
        return
      }
    }
  }
}

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

function toElementArray(elements, parent) {
  if (elements instanceof Element) {
    return [elements]
  } else {
    if (typeof elements === 'string') {
      elements = parent.querySelectorAll(elements)
    }
    return Array.prototype.slice.call(elements)
  }
}
