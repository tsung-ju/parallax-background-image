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

  function pollScrollProgress (element, callback) {
    var lastProgress = null

    function poll () {
      var rect = element.getBoundingClientRect()
      var height = rect.bottom - rect.top
      var progress = 1 - rect.bottom / (height + window.innerHeight)
      if (progress > 0 && progress < 1 && progress !== lastProgress) {
        lastProgress = progress
        callback(progress)
      }
      window.requestAnimationFrame(poll)
    }
    poll()
  }

  function getImageSize (src, callback) {
    var image = new Image()
    image.onload = function () {
      callback(image.naturalWidth, image.naturalHeight)
    }
    image.src = src
  }

  function parallax (elements, from, to) {
    from = from != null ? from : 0
    to = to != null ? to : 1
    forEachElement(elements, function (element) {
      var style = window.getComputedStyle(element)
      var backgroundImage = style.getPropertyValue('background-image')
      var url = parseCssUrl(backgroundImage)
      var cssSize = style.getPropertyValue('background-size')
      var cssPosition = style.getPropertyValue('background-position')
      var positionX = cssPosition.split(' ')[0]
      getImageSize(url, function (imageWidth, imageHeight) {
        pollScrollProgress(element, function (progress) {
          var elementHeight = element.clientHeight
          var elementWidth = element.clientWidth

          var scaledImageHeight = imageHeight * elementWidth / imageWidth

          if (scaledImageHeight <= elementHeight) {
            element.style.backgroundSize = cssSize
            element.style.backgroundPosition = cssPosition
            return
          }

          element.style.backgroundSize = elementWidth + 'px' + ' ' + 'auto'

          var startPositionY = -from * scaledImageHeight
          var deltaPositionY = elementHeight - (to - from) * scaledImageHeight

          var positionY = startPositionY + deltaPositionY * progress

          element.style.backgroundPosition = '0' + ' ' + Math.round(positionY) + 'px'
        })
      })
    })
  }
  window.parallax = parallax
}())
