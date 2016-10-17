(function () {
  const CLASS_NAME_PARENT = 'parallax-parent'
  const styleSheet = createStyleSheet()
  styleSheet.insertRule(`
    .${CLASS_NAME_PARENT} > * {
      isolation: isolate;
    }
  `, 0)

  class Parallax {
    constructor (viewport, perspective = 1000) {
      if (typeof viewport === 'string') viewport = document.querySelector(viewport)

      Object.assign(viewport.style, {
        overflowY: 'scroll',
        transformStyle: 'flat',
        perspective: perspective + 'px',
        perspectiveOrigin: '0 0'
      })

      this.viewport = viewport
      this.perspective = perspective
    }

    add (elements, velocityScale = 0.8, createBackground = Parallax.before) {
      if (velocityScale < 0) throw new RangeError('velocityScale must be positive')

      forEachElement(elements, element => {
        element.classList.add(CLASS_NAME_PARENT)
        const elementStyle = window.getComputedStyle(element)
        if (elementStyle.position === 'static') {
          element.style.position = 'relative'
        }
        element.style.overflow = 'hidden'
        loadImage(parseCssUrl(elementStyle.backgroundImage), image => {
          const style = createBackground(element, image)

          Object.assign(style, {
            position: 'absolute',
            left: '0',
            top: '0',
            transformOrigin: '0 0 0',
            pointerEvents: 'none'
          })

          let cache = []
          const updateStyle = () => {
            const {width, height, left} = element.getBoundingClientRect()
            const viewportHeight = this.viewport.clientHeight
            const deps = [width, height, left, viewportHeight]
            if (deps.some((dep, i) => cache[i] !== dep)) {
              cache = deps

              const backgroundHeight = Math.max(
                  image.naturalHeight * (width / image.naturalWidth),
                  Math.min(height + Math.abs(velocityScale - 1) * (viewportHeight + height),
                           viewportHeight + velocityScale * (viewportHeight + height)),
                  Math.min(height - Math.abs(velocityScale - 1) * (viewportHeight + height),
                           viewportHeight - velocityScale * (viewportHeight + height)))

              const baseScale = backgroundHeight / image.naturalHeight

              const scale = 1 / velocityScale

              style.transform = `
                scale(${baseScale}, ${baseScale})
                translateX(${left * (scale - 1)}px)
                translateY(${((viewportHeight - backgroundHeight) * scale - (viewportHeight - height)) / 2}px)
                translateZ(${this.perspective * (1 - scale)}px)
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
    return (element, image) => {
      const className = CLASS_NAME_PREFIX + nextId++
      element.classList.add(className)

      const rule = `.${className}::before {
        content: '';
        width: ${image.naturalWidth}px;
        height: ${image.naturalHeight}px;
        background-image: url(${image.src});
        background-size: 100% 100%;
      }`

      const index = styleSheet.insertRule(rule, 0)

      return styleSheet.cssRules[index].style
    }
  }())

  Parallax.img = (element, image) => {
    image.width = image.naturalWidth
    image.height = image.naturalHeight
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
    for (let i = 0; i < elements.length; i++) {
      callback(elements[i])
    }
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
