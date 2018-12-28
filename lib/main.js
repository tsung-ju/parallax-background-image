import { ParallaxViewport } from './parallax-viewport'
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

const defaultOptions = {
  use3d: isChrome(),
  velocity: 0.8,
  alignX: 'center',
  renderer: ImageElementRenderer,
  image: cssBackgroundImage
}

export function createViewport(rootElement, options = {}) {
  options = Object.assign({}, defaultOptions, options)
  return new ParallaxViewport(rootElement, options)
}

export { ImageElementRenderer, PseudoElementRenderer }
