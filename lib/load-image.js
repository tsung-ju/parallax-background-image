export function cssBackgroundImage(element) {
  const style = window.getComputedStyle(element)
  const src = /^url\((['"]?)(.*)\1\)$/.exec(style.backgroundImage)[2]
  return src
}

export function loadImage(src, element) {
  return new Promise(function(resolve, reject) {
    if (typeof src === 'function') {
      src = src(element)
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
