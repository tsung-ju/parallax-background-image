import { CLASS_PARALLAX_VIEWPORT, CLASS_PARALLAX_VIEWPORT_3D } from './style'
import { ParallaxElement } from './parallax-element'
import { ImageElementRenderer } from './renderer'

export class ParallaxViewport {
  constructor(rootElement, options) {
    if (typeof rootElement === 'string') {
      rootElement = document.querySelector(rootElement)
    }

    options = {
      use3d: isChrome(),
      ...options
    }

    this.rootElement = rootElement
    this.options = options
    this.parallaxElements = []

    this._setupStyle()
    this._monitorRects()
    this._startRenderLoop()
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

  add(elements, options = {}) {
    if (elements instanceof Element) {
      this._addElement(elements, options)
      return
    }

    if (typeof elements === 'string') {
      elements = this.rootElement.querySelectorAll(elements)
    }

    for (let i = 0; i < elements.length; ++i) {
      this._addElement(elements[i], options)
    }
  }

  _addElement(element, options) {
    if (!this._isViewportFor(element)) return
    this._removeElement(element)

    options = this._parseElementOptions(element, options)
    if (options.image == null) return

    loadImage(options.image, (err, image) => {
      if (err) return
      this.parallaxElements.push(new ParallaxElement(element, image, options))
      this._updateRects()
    })
  }

  _isViewportFor(element) {
    return (
      element !== this.rootElement &&
      element.closest(`.${CLASS_PARALLAX_VIEWPORT}`) === this.rootElement
    )
  }

  _parseElementOptions(element, options) {
    if (typeof options === 'function') {
      options = options(element)
    }

    options = {
      velocity: 0.8,
      alignX: 'center',
      renderer: ImageElementRenderer,
      ...options
    }

    if (options.image == null) {
      options.image = cssBackgroundImage(element)
    }

    options.use3d = this.options.use3d

    return options
  }

  remove(elements) {
    if (elements instanceof Element) {
      this._removeElement(elements)
      return
    }

    if (typeof elements === 'string') {
      elements = this.rootElement.querySelectorAll(elements)
    }

    for (let i = 0; i < elements.length; ++i) {
      this._removeElement(elements[i])
    }
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

function isChrome() {
  const userAgent = navigator.userAgent
  return (
    userAgent.indexOf('Chrome/') !== -1 && userAgent.indexOf('Edge/') === -1
  )
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

function cssBackgroundImage(element) {
  const style = window.getComputedStyle(element)
  const match = /^url\((['"]?)(.*)\1\)$/.exec(style.backgroundImage)
  return match == null ? null : match[2]
}

function loadImage(src, cb) {
  const image = document.createElement('img')
  image.onload = function(event) {
    cb(null, event.target)
  }
  image.onerror = function(event) {
    cb(event.error)
  }
  image.src = src
}
