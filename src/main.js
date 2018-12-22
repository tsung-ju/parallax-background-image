import { ParallaxViewport } from './parallax-viewport'
import {
  coverElement,
  parallax2d,
  parallax3d,
  pipeTransform
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
  return pipeTransform(
    coverElement(image, options.velocity),
    parallax(options.velocity)
  )
}

const defaultOptions = {
  use3d: isChrome(),
  velocity: 0.8,
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
  parallax2d,
  parallax3d,
  pipeTransform,
  ImageElementRenderer,
  PseudoElementRenderer
}
