import { ParallaxElement } from './parallax-element'
import { CLASS_PARALLAX_VIEWPORT, CLASS_PARALLAX_VIEWPORT_3D } from './style'
import { toElement, toElementArray } from './to-element'
import { loadBackgroundImage } from './background-image'

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
    const { use3d, scheduler } = options
    viewport = toElement(viewport, document)
    this.viewport = viewport
    this.options = options
    this.elements = []

    viewport.classList.add(CLASS_PARALLAX_VIEWPORT)
    if (use3d) {
      viewport.classList.add(CLASS_PARALLAX_VIEWPORT_3D)
    }

    this._startReadLoop(viewport, this.elements, scheduler)
    this._startWriteLoop(this.elements, scheduler)
  }

  _startReadLoop(viewport, elements, scheduler) {
    function readLoop() {
      const viewportRect = getRect(viewport)
      for (let i = 0; i < elements.length; ++i) {
        const elementRect = getRect(elements[i].element)
        subtract_(elementRect, viewportRect)
        elements[i].layout(elementRect, viewportRect)
      }
      scheduler.read(readLoop)
    }
    scheduler.read(readLoop)
  }

  _startWriteLoop(elements, scheduler) {
    function writeLoop() {
      for (let i = 0; i < elements.length; ++i) {
        elements[i].render()
      }
      scheduler.write(writeLoop)
    }
    scheduler.write(writeLoop)
  }

  add(elements, options = {}) {
    elements = toElementArray(elements, this.viewport)

    options = { ...this.options, ...options }

    return elements.map(element => {
      return loadBackgroundImage(element, options.backgroundImage).then(
        image => {
          this.elements.push(new ParallaxElement(element, image, options))
        }
      )
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
