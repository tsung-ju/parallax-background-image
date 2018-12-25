import { toAsyncFunction } from './to-function'

export function cssBackgroundImage(element, options) {
  const style = window.getComputedStyle(element)
  const src = /url\(['"]?(.*?)['"]?\)/.exec(style.backgroundImage)[1]
  return src
}

export function loadBackgroundImage(element, src, options) {
  return toAsyncFunction(src)(element, options).then(loadImage)
}

function loadImage(src) {
  return new Promise(function(resolve, reject) {
    const image = document.createElement('img')
    image.onload = function(event) {
      resolve(event.target)
    }
    image.onerror = function(event) {
      reject(event.error)
    }
    image.src = src
  })
}
