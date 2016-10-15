(function () {
  class Parallax {
    constructor (viewport = document.body, perspective = 1000) {
      if (typeof viewport === 'string') viewport = document.querySelector(viewport)

      Object.assign(viewport.style, {
        overflowY: 'scroll',
        perspective: perspective + 'px',
        perspectiveOrigin: '0 0'
      })

      this.viewport = viewport
      this.perspective = perspective
    }

    add (elements, initialPosition = '0', velocityScale = 0.8, createBackground = Parallax.before) {
      if (velocityScale < 0) throw new RangeError('velocityScale must be positive')

      forEachElement(elements, element => {
        const elementStyle = window.getComputedStyle(element)
        if (elementStyle.position === 'static') {
          element.style.position = 'relative'
        }
        loadImage(parseCssUrl(elementStyle.backgroundImage), image => {
          const style = createBackground(element, image)

          Object.assign(style, {
            position: 'absolute',
            left: '0',
            top: '0',
            width: '100%',
            transformOrigin: '0 0 0',
            pointerEvents: 'none'
          })

          let cache = []
          const updateStyle = () => {
            const {height, width, left} = element.getBoundingClientRect()
            const deps = [height / width, left]
            if (deps.some((v, i) => cache[i] !== v)) {
              cache = deps
              const backgroundHeight = image.naturalHeight * (height / width)

              const scale = 1 / velocityScale

              style.height = backgroundHeight + 'px'
              style.transform = `
                translateX(${this.perspective * (1 - scale)}px)
                translateY(calc((100vh + ${initialPosition}) * ${scale} - 100vh))
                translateZ(${elementRect.left * (scale - 1)}px)
                scale(${scale}, ${scale})`
            }
            window.requestAnimationFrame(updateStyle)
          }
          updateStyle()
        })
      })
    }
  }

  Parallax.before = (function () {
    const CLASS_NAME_PREFIX = 'parallax-background-'
    let nextId = 0
    let styleSheet = null

    return (element, image) => {
      if (styleSheet == null) styleSheet = createStyleSheet()

      const className = CLASS_NAME_PREFIX + nextId++
      element.classList.add(className)

      const rule = `.${className}::before {
        content: ' ';
      }`

      const index = styleSheet.insertRule(rule, 0)

      return styleSheet.cssRules[index]
    }
  }())

  Parallax.img = (element, image) => {
    element.insertBefore(image, element.firstChild)
    return image.style
  }

  function createStyleSheet () {
    const style = document.createElement('style')
    style.appendChild(document.createTextNode(''))
    document.head.appendChild(style)
    return style.sheet
  }

  function forEachElement (elements, callback) {
    if (elements instanceof Element) return callback(elements)
    if (typeof elements === 'string') {
      elements = document.querySelectorAll(elements)
    }
    for (let element of elements) callback(element)
  }

  function parseCssUrl (str) {
    return str.match(/url\(['"]?(.*?)['"]?\)/)[1]
  }

  function loadImage (src, callback) {
    const image = new Image()
    image.onload = () => {
      callback(image)
    }
    image.src = src
  }

  window.Parallax = Parallax
}())