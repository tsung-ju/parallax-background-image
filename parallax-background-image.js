;(function () {
  function forEachElement (elements, callback) {
    if (elements instanceof HTMLElement) {
      elements = [elements]
    }
    if (typeof elements === 'string') {
      elements = document.querySelectorAll(elements)
    }
    Array.prototype.forEach.call(elements, callback)
  }

  function parseCssUrl (str) {
    return str.match(/url\(['"]?(.*?)['"]?\)/)[1]
  }

  function loadImage (src, callback) {
    var image = new Image()
    image.onload = function () {
      callback(image)
    }
    image.src = src
  }

  function Parallax (wrapper, perspective) {
    perspective = perspective != null ? perspective : 1000

    if (typeof wrapper === 'string') wrapper = document.querySelector(wrapper)

    wrapper.style.position = 'fixed'
    wrapper.style.top = '0'
    wrapper.style.right = '0'
    wrapper.style.bottom = '0'
    wrapper.style.left = '0'
    wrapper.style.overflowY = 'scroll'
    wrapper.style.perspective = perspective.toString() + 'px'
    wrapper.style.perspectiveOrigin = '0 0'

    this.perspective = perspective
  }

  Parallax.prototype.injectBackground = function (target, from, to) {
    from = from != null ? from : 0
    to = to != null ? to : 1

    var perspective = this.perspective

    forEachElement(target, function (element) {
      var style = window.getComputedStyle(element)
      if (style.getPropertyValue('position') === 'static') {
        element.style.position = 'relative'
      }
      element.style.overflow = 'hidden'
      var backgroundImage = style.getPropertyValue('background-image')
      var url = parseCssUrl(backgroundImage)

      loadImage(url, function (image) {
        image.style.position = 'absolute'
        image.style.left = '0'
        image.style.top = '0'
        image.style.width = '100%'
        image.style.height = 'auto'
        image.style.transformOrigin = '0 0 0'
        image.style.pointerEvents = 'none'

        function updateTransform () {
          var rect = element.getBoundingClientRect()
          var fromPosition = from * image.clientHeight
          var toPosition = to * image.clientHeight
          var delta = toPosition - fromPosition
          var translateZ = perspective * (delta - rect.height) / (delta + window.innerHeight)
          var scale = (perspective - translateZ) / perspective
          var translateY = rect.height - scale * toPosition
          var translateX = rect.left * (-translateZ) / perspective
          image.style.transform =
              'translateX(' + Math.round(translateX) + 'px)' + ' ' +
              'translateY(' + Math.round(translateY) + 'px)' + ' ' +
              'translateZ(' + Math.round(translateZ) + 'px)' + ' ' +
              'scale(' + scale + ',' + scale + ')'
          window.requestAnimationFrame(updateTransform)
        }

        updateTransform()

        element.insertBefore(image, element.firstChild)
      })
    })
  }
  window.Parallax = Parallax
}())
