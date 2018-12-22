var parallax = (function (exports, domScheduler) {
  'use strict';

  function toElement(element, parent) {
    if ( parent === void 0 ) parent = document;

    if (typeof element === 'string') { return parent.querySelector(element) }
    else { return element }
  }

  function toElementArray(elements, parent) {
    if ( parent === void 0 ) parent = document;

    if (elements instanceof Element) { return [elements] }
    if (typeof elements === 'string') { elements = parent.querySelectorAll(elements); }
    return Array.prototype.slice.call(elements)
  }

  function toFunction(toFunc) {
    if (typeof toFunc === 'function') { return toFunc }
    return function() {
      return toFunc
    }
  }

  function toAsyncFunction(toFunc) {
    var func = toFunction(toFunc);
    return function() {
      return Promise.resolve(func.apply(this, arguments))
    }
  }

  function cssBackgroundImage(element, options) {
    var style = window.getComputedStyle(element);
    var src = /url\(['"]?(.*?)['"]?\)/.exec(style.backgroundImage)[1];
    return src
  }

  function loadBackgroundImage(element, backgroundImage, options) {
    backgroundImage = toAsyncFunction(backgroundImage);
    return backgroundImage(element, options).then(loadImage)
  }

  function loadImage(src) {
    return new Promise(function(resolve, reject) {
      var image = document.createElement('img');
      image.onload = function(event) {
        resolve(event.target);
      };
      image.onerror = function(event) {
        reject(event.error);
      };
      image.src = src;
    })
  }

  function appendStyleSheet() {
    var style = createStyleElement();
    document.head.appendChild(style);
    return style.sheet
  }

  function prependStyleSheet() {
    var style = createStyleElement();
    document.head.insertBefore(style, document.head.firstElementChild);
    return style.sheet
  }

  function createStyleElement() {
    var style = document.createElement('style');
    style.appendChild(document.createTextNode(''));
    return style
  }

  var CLASS_PARALLAX_VIEWPORT = 'parallax-background-image-viewport';
  var CLASS_PARALLAX_VIEWPORT_3D = 'parallax-background-image-viewport-3d';
  var CLASS_PARALLAX_ELEMENT = 'parallax-background-image-element';

  initialize();

  function initialize() {
    var styleSheet = prependStyleSheet();
    styleSheet.insertRule(
      ("\n    ." + CLASS_PARALLAX_ELEMENT + " {\n      position: relative;\n      overflow: hidden;\n    }\n  "),
      0
    );

    styleSheet.insertRule(
      ("\n    ." + CLASS_PARALLAX_ELEMENT + " > * {\n      position: relative;\n    }\n  "),
      0
    );

    styleSheet.insertRule(
      ("\n    ." + CLASS_PARALLAX_VIEWPORT + " {\n      overflow-y: scroll;\n      -webkit-overflow-scrolling: touch;\n    }\n  "),
      0
    );
    styleSheet.insertRule(
      ("\n    ." + CLASS_PARALLAX_VIEWPORT_3D + " {\n      perspective: 1px;\n      perspective-origin: center center;\n      transform-style: flat;\n    }\n  "),
      0
    );
  }

  function getRect(element) {
    var rect = element.getBoundingClientRect();
    return {
      x: (rect.left + rect.right) / 2,
      y: (rect.top + rect.bottom) / 2,
      width: rect.right - rect.left,
      height: rect.bottom - rect.top
    }
  }

  var ParallaxViewport = function ParallaxViewport(viewport, options) {
    this.viewport = toElement(viewport);
    this.options = options;
    this.entries = [];

    this.viewport.classList.add(CLASS_PARALLAX_VIEWPORT);
    if (options.use3d) { this.viewport.classList.add(CLASS_PARALLAX_VIEWPORT_3D); }

    this._observe();
  };

  ParallaxViewport.prototype._observe = function _observe () {
      var this$1 = this;

    var loop = function () {
      var viewportRect = getRect(this$1.viewport);
      for (var i = 0; i < this$1.entries.length; ++i) {
        var ref = this$1.entries[i];
          var element = ref.element;
          var transform = ref.transform;
          var renderer = ref.renderer;
        var elementRect = getRect(element);
        var t = transform(elementRect, viewportRect);
        renderer.render(t);
      }
      domScheduler.scheduler.read(loop);
    };
    domScheduler.scheduler.read(loop);
  };

  ParallaxViewport.prototype.add = function add (elements, options) {
      var this$1 = this;
      if ( options === void 0 ) options = {};

    elements = toElementArray(elements, this.viewport);

    options = Object.assign({}, this.options, options);

    return elements.map(function (element) {
      return loadBackgroundImage(element, options.backgroundImage).then(
        function (image) {
          this$1._addElement(element, image, options);
        }
      )
    })
  };

  ParallaxViewport.prototype._addElement = function _addElement (element, image, options) {
    this._removeElement(element);

    element.classList.add(CLASS_PARALLAX_ELEMENT);
    var transform = options.transform(element, image, options);
    var renderer = new options.renderer(element, image, options);

    this.entries.push({ element: element, transform: transform, renderer: renderer });
  };

  ParallaxViewport.prototype.remove = function remove (elements) {
      var this$1 = this;

    toElementArray(elements).forEach(function (element) { return this$1._removeElement(element); });
  };

  ParallaxViewport.prototype._removeElement = function _removeElement (element) {
    var i = 0;
    while (i < this.entries.length && this.entries[i].element !== element) { ++i; }
    if (i === this.entries.length) { return }
    var entry = this.entries.splice(i, 1)[0];
    entry.element.classList.remove(CLASS_PARALLAX_ELEMENT);
    entry.renderer.dispose();
  };

  function coverElement(image, velocity) {
    return function(element, viewport) {
      var minWidth = element.width;
      var minHeight =
        viewport.height + velocity * (viewport.height - element.height);
      var widthScale = minWidth / image.naturalWidth;
      var heightScale = minHeight / image.naturalHeight;
      return {
        x: 0,
        y: 0,
        z: 0,
        s: Math.max(widthScale, heightScale)
      }
    }
  }

  function parallax3d(velocity) {
    return function(element, viewport) {
      return {
        x: (element.x - viewport.x) * (1 / velocity - 1),
        y: 0,
        z: 1 - 1 / velocity,
        s: 1 / velocity
      }
    }
  }

  function parallax2d(velocity) {
    return function(element, viewport) {
      return {
        x: 0,
        y: (element.y - viewport.y) * (velocity - 1),
        z: 0,
        s: 1
      }
    }
  }

  function pipeTransform() {
    var ts = [], len = arguments.length;
    while ( len-- ) ts[ len ] = arguments[ len ];

    return function(element, viewport) {
      var res = { x: 0, y: 0, z: 0, s: 1 };
      for (var i = 0; i < ts.length; ++i) {
        var ref = ts[i](element, viewport);
        var x = ref.x;
        var y = ref.y;
        var z = ref.z;
        var s = ref.s;
        res.x = s * res.x + x;
        res.y = s * res.y + y;
        res.z = s * res.z + z;
        res.s = s * res.s;
      }
      return res
    }
  }

  function renderToStyle(style) {
    domScheduler.scheduler.write(function() {
      style.position = 'absolute';
      style.left = '50%';
      style.top = '50%';
      style.transformOrigin = 'center center 0';
      style.pointerEvents = 'none';
    });

    return function render(ref) {
      var x = ref.x;
      var y = ref.y;
      var z = ref.z;
      var s = ref.s;

      var css = "\n      translate(-50%, -50%)\n      translate3d(" + x + "px, " + y + "px, " + z + "px)\n      scale(" + s + ", " + s + ")";

      domScheduler.scheduler.write(function() {
        style.transform = css;
      });
    }
  }

  function dropRepeat(render) {
    var started = false;
    var prev = null;
    return function(t) {
      if (
        started &&
        t.x === prev.x &&
        t.y === prev.y &&
        t.z === prev.z &&
        t.s === prev.s
      )
        { return }
      started = true;
      prev = t;
      render(t);
    }
  }

  var ImageElementRenderer = function ImageElementRenderer(element, image, options) {
    var this$1 = this;

    this.element = element;
    this.img = document.createElement('img');

    domScheduler.scheduler.write(function () {
      this$1.img.height = image.naturalHeight;
      this$1.img.width = image.naturalWidth;
      this$1.img.src = image.src;
      this$1.element.prepend(this$1.img);
    });

    this.render = dropRepeat(renderToStyle(this.img.style));
  };

  ImageElementRenderer.prototype.dispose = function dispose () {
    this.element.removeChild(this.img);
  };

  var styleSheet = appendStyleSheet();
  var nextId = 0;
  var PseudoElementRenderer = function PseudoElementRenderer(element, image, options) {
    this.element = element;
    var id = nextId++;
    this.className = "parallax-background-image-pseudo-" + id;

    this.element.classList.add(this.className);

    var rule = "." + (this.className) + "::before {\n      content: '';\n      width: " + (image.naturalWidth) + "px;\n      height: " + (image.naturalHeight) + "px;\n      background-image: url(" + (image.src) + ");\n      background-size: 100% 100%;\n    }";

    var index = styleSheet.insertRule(rule, 0);
    var style = styleSheet.cssRules[index].style;
    this.render = dropRepeat(renderToStyle(style));
  };
  PseudoElementRenderer.prototype.dispose = function dispose () {
    this.element.classList.remove(this.className);
  };

  function isChrome() {
    var userAgent = navigator.userAgent;
    return (
      userAgent.indexOf('Chrome/') !== -1 && userAgent.indexOf('Edge/') === -1
    )
  }

  function defaultTransform(element, image, options) {
    var parallax = options.use3d ? parallax3d : parallax2d;
    return pipeTransform(
      coverElement(image, options.velocity),
      parallax(options.velocity)
    )
  }

  var defaultOptions = {
    use3d: isChrome(),
    velocity: 0.8,
    renderer: ImageElementRenderer,
    transform: defaultTransform,
    backgroundImage: cssBackgroundImage
  };

  function createViewport(viewport, options) {
    if ( options === void 0 ) options = {};

    options = Object.assign({}, defaultOptions, options);
    return new ParallaxViewport(viewport, options)
  }

  exports.createViewport = createViewport;
  exports.coverElement = coverElement;
  exports.parallax2d = parallax2d;
  exports.parallax3d = parallax3d;
  exports.pipeTransform = pipeTransform;
  exports.ImageElementRenderer = ImageElementRenderer;
  exports.PseudoElementRenderer = PseudoElementRenderer;

  return exports;

}({}, domScheduler));
