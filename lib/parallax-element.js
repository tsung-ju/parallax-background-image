import { CLASS_PARALLAX_ELEMENT } from './style'

function notEqual(a, b) {
  return a.x !== b.x || a.y !== b.y || a.z !== b.z || a.w !== b.w || a.h !== b.h
}

function copy_(a, b) {
  a.x = b.x
  a.y = b.y
  a.z = b.z
  a.w = b.w
  a.h = b.h
}

export class ParallaxElement {
  constructor(element, image, options) {
    this.element = element
    this.transform = options.transform(element, image, options)
    this.renderer = new options.renderer(element, image, options)
    this.imageWidth = image.naturalWidth
    this.imageHeight = image.naturalHeight

    this.bgRect = { x: NaN, y: NaN, z: NaN, w: NaN, h: NaN }
    this.dirty = false

    element.classList.add(CLASS_PARALLAX_ELEMENT)
  }

  layout(elementRect, viewportRect) {
    const bgRect = { x: 0, y: 0, z: 0, w: this.imageWidth, h: this.imageHeight }
    this.transform(bgRect, elementRect, viewportRect)
    if (this.bgRect == null || notEqual(this.bgRect, bgRect)) {
      this.dirty = true
      copy_(this.bgRect, bgRect)
    }
  }

  render() {
    if (!this.dirty) return
    this.dirty = false
    this.renderer.render(this.bgRect)
  }

  dispose() {
    this.element.classList.remove(CLASS_PARALLAX_ELEMENT)
    this.renderer.dispose()
  }
}
