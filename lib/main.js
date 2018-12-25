import { scheduler } from '@ray851107/dom-scheduler'
import { ParallaxViewport } from './parallax-viewport'
import {
  coverElement,
  alignX,
  parallax2d,
  parallax3d,
  chainTransforms
} from './transform.js'
import { cssBackgroundImage } from './load-image.js'
import { ImageElementRenderer, PseudoElementRenderer } from './renderer.js'
import { injectStyle } from './style.js'

injectStyle()

function isChrome() {
  const { userAgent } = navigator
  return (
    userAgent.indexOf('Chrome/') !== -1 && userAgent.indexOf('Edge/') === -1
  )
}

function defaultTransform(element, image, options) {
  const parallax = options.use3d ? parallax3d : parallax2d
  const t1 = coverElement(options.velocity)
  const t2 = alignX(options.alignX)
  const t3 = parallax(options.velocity)

  return function(bg, element, viewport) {
    t1(bg, element, viewport)
    t2(bg, element, viewport)
    t3(bg, element, viewport)
  }
}

const defaultOptions = {
  use3d: isChrome(),
  velocity: 0.8,
  alignX: 'center',
  scheduler: scheduler,
  renderer: ImageElementRenderer,
  transform: defaultTransform,
  image: cssBackgroundImage
}

export function createViewport(viewport, options = {}) {
  options = { ...defaultOptions, ...options }
  return new ParallaxViewport(viewport, options)
}

export {
  coverElement,
  alignX,
  parallax2d,
  parallax3d,
  chainTransforms,
  ImageElementRenderer,
  PseudoElementRenderer
}
