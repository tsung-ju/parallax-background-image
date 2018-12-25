export function cssBackgroundImage(element, options) {
  const style = window.getComputedStyle(element)
  const src = /url\(['"]?(.*?)['"]?\)/.exec(style.backgroundImage)[1]
  return src
}

export function loadImage(element, src, options) {
  return new Promise(function(resolve, reject) {
    if (typeof src === 'function') {
      src = src(element, options)
    }

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
