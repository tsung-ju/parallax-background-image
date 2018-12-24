import { toElement, toElementArray } from './to-element'
import { loadBackgroundImage } from './background-image'
import { prependStyleSheet } from './style-sheet'

const CLASS_PARALLAX_VIEWPORT = 'parallax-background-image-viewport'
const CLASS_PARALLAX_VIEWPORT_3D = 'parallax-background-image-viewport-3d'
const CLASS_PARALLAX_ELEMENT = 'parallax-background-image-element'

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
    viewport = toElement(viewport)
    this.viewport = viewport
    this.options = options
    this.entries = []

    viewport.classList.add(CLASS_PARALLAX_VIEWPORT)
    if (use3d) {
      viewport.classList.add(CLASS_PARALLAX_VIEWPORT_3D)
    }

    this._observe(viewport, this.entries, scheduler)
  }

  _observe(viewport, entries, scheduler) {
    const loop = () => {
      const viewportRect = getRect(viewport)
      for (let i = 0; i < entries.length; ++i) {
        const { element, transform, renderer, initialBg } = entries[i]

        const elementRect = getRect(element)
        subtract_(elementRect, viewportRect)

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

prependStyleSheet(`
.${CLASS_PARALLAX_ELEMENT} {
  position: relative;
  overflow: hidden;
  background: none !important;
  background-image: none !important;
}

.${CLASS_PARALLAX_ELEMENT} > * {
  position: relative;
}

.${CLASS_PARALLAX_VIEWPORT} {
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}

.${CLASS_PARALLAX_VIEWPORT_3D} {
  perspective: 1px;
  perspective-origin: center center;
  transform-style: flat;
}`)
