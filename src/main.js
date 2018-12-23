import { ParallaxViewport } from './parallax-viewport'
import {
  coverElement,
  alignX,
  parallax2d,
  parallax3d,
  chainTransforms
} from './transform.js'
import { cssBackgroundImage } from './background-image.js'
import { ImageElementRenderer, PseudoElementRenderer } from './renderer.js'

function isChrome() {
  const { userAgent } = navigator
  return (
    userAgent.indexOf('Chrome/') !== -1 && userAgent.indexOf('Edge/') === -1
  )
}

function defaultTransform(element, image, options) {
  const parallax = options.use3d ? parallax3d : parallax2d
  return chainTransforms([
    coverElement(options.velocity),
    alignX(options.alignX),
    parallax(options.velocity)
  ])
}

const defaultOptions = {
  use3d: isChrome(),
  velocity: 0.8,
  alignX: 'center',
  renderer: ImageElementRenderer,
  transform: defaultTransform,
  backgroundImage: cssBackgroundImage
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
