;(function () {
  function forEachElement (elements, callback) {
    if (elements instanceof HTMLElement) {
      elements = [elements]
    }
    if (typeof elements == 'string') {
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
      var progress = rect.bottom / (height + window.innerHeight)
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

  function parallex (elements, from, to) {
    from = from != null ? from : 0
    to = to != null ? to : 1
    forEachElement(elements, function (element) {
      var style = window.getComputedStyle(element)
      var backgroundImage = style.getPropertyValue('background-image')
      var positionX = style.getPropertyValue('background-position').split(' ')[0]
      var url = parseCssUrl(backgroundImage)
      getImageSize(url, function (imageWidth, imageHeight) {
        pollScrollProgress(element, function (progress) {
          var elementHeight = element.clientHeight
          var elementWidth = element.clientWidth
          var scaledImageHeight = imageHeight * elementWidth / imageWidth
          var overflowY = scaledImageHeight - elementHeight
          if (overflowY <= 0) return
          var positionY = (from + (to - from) * progress) * overflowY
          positionY = Math.round(positionY / 2 - overflowY) + 'px'
          element.style.backgroundPosition = positionX + ' ' + positionY
        })
      })
    })
  }
  window.parallex = parallex
}())
