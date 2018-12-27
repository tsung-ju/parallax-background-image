import { ParallaxViewport } from './parallax-viewport'
import { coverElement, alignX, parallax2d, parallax3d } from './transform.js'
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
  const coverElement_ = coverElement(options.velocity)
  const alignX_ = alignX(options.alignX)
  const parallax_ = parallax(options.velocity)

  return function(bg, element, viewport) {
    coverElement_(bg, element, viewport)
    alignX_(bg, element, viewport)
    parallax_(bg, element, viewport)
  }
}

const defaultOptions = {
  use3d: isChrome(),
  velocity: 0.8,
  alignX: 'center',
  renderer: ImageElementRenderer,
  transform: defaultTransform,
  image: cssBackgroundImage
}

export function createViewport(viewport, options = {}) {
  options = Object.assign({}, defaultOptions, options)
  return new ParallaxViewport(viewport, options)
}

export { ImageElementRenderer, PseudoElementRenderer }
