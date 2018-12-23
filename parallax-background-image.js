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

  function appendStyleSheet(content) {
    if ( content === void 0 ) content = '';

    var style = createStyleElement(content);
    document.head.appendChild(style);
    return style.sheet
  }

  function prependStyleSheet(content) {
    if ( content === void 0 ) content = '';

    var style = createStyleElement(content);
    document.head.insertBefore(style, document.head.firstElementChild);
    return style.sheet
  }

  function createStyleElement(content) {
    if ( content === void 0 ) content = '';

    var style = document.createElement('style');
    style.appendChild(document.createTextNode(content));
    return style
  }

  var CLASS_PARALLAX_VIEWPORT = 'parallax-background-image-viewport';
  var CLASS_PARALLAX_VIEWPORT_3D = 'parallax-background-image-viewport-3d';
  var CLASS_PARALLAX_ELEMENT = 'parallax-background-image-element';

  function getRect(element) {
    var rect = element.getBoundingClientRect();
    return {
      x: (rect.left + rect.right) / 2,
      y: (rect.top + rect.bottom) / 2,
      w: rect.right - rect.left,
      h: rect.bottom - rect.top
    }
  }

  function subtract_(a, b) {
    a.x -= b.x;
    a.y -= b.y;
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
          var initialBg = ref.initialBg;

        var elementRect = getRect(element);
        subtract_(elementRect, viewportRect);

        var bg = Object.assign({}, initialBg);
        transform(bg, elementRect, viewportRect);
        renderer.render(bg);
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
    var initialBg = {
      x: 0,
      y: 0,
      z: 0,
      w: image.naturalWidth,
      h: image.naturalHeight
    };

    this.entries.push({ element: element, transform: transform, renderer: renderer, initialBg: initialBg });
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

  prependStyleSheet(("\n." + CLASS_PARALLAX_ELEMENT + " {\n  position: relative;\n  overflow: hidden;\n  background: none !important;\n  background-image: none !important;\n}\n\n." + CLASS_PARALLAX_ELEMENT + " > * {\n  position: relative;\n}\n\n." + CLASS_PARALLAX_VIEWPORT + " {\n  overflow-y: scroll;\n  -webkit-overflow-scrolling: touch;\n}\n\n." + CLASS_PARALLAX_VIEWPORT_3D + " {\n  perspective: 1px;\n  perspective-origin: center center;\n  transform-style: flat;\n}"));

  function scale_(bg, s) {
    bg.x *= s;
    bg.y *= s;
    bg.z *= s;
    bg.w *= s;
    bg.h *= s;
  }

  function coverElement(velocity) {
    return function(bg, element, viewport) {
      var minWidth = element.w;
      var minHeight = viewport.h + velocity * (viewport.h - element.h);
      var widthScale = minWidth / bg.w;
      var heightScale = minHeight / bg.h;

      scale_(bg, Math.max(widthScale, heightScale));
    }
  }

  function alignX(percentage) {
    percentage = parsePercentage(percentage);
    return function(bg, element, viewport) {
      bg.x = (0.5 - percentage) * (bg.w - element.w);
    }
  }

  function parsePercentage(str) {
    if (str === 'left') { return 0 }
    if (str === 'center') { return 0.5 }
    if (str === 'right') { return 1 }
    var num = parseFloat(str);
    if (!isNaN(num)) { return num / 100 }
    return 0.5
  }

  function parallax3d(velocity) {
    return function(bg, element, viewport) {
      scale_(bg, 1 / velocity);
      bg.z += 1 - 1 / velocity;
      bg.x -= element.x * (1 - 1 / velocity);
    }
  }

  function parallax2d(velocity) {
    return function(bg, element, viewport) {
      bg.y += element.y * (velocity - 1);
    }
  }

  function chainTransforms(transforms) {
    return function(bg, element, viewport) {
      for (var i = 0; i < transforms.length; ++i) {
        transforms[i](bg, element, viewport);
      }
    }
  }

  function renderToStyle(style, width, height) {
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
      var w = ref.w;
      var h = ref.h;

      var css =
        "translate(-50%, -50%)" +
        "translate3d(" + x + "px, " + y + "px, " + z + "px)" +
        "scale(" + (w / width) + ", " + (h / height) + ")";

      domScheduler.scheduler.write(function() {
        style.transform = css;
      });
    }
  }

  function dropRepeat(render) {
    var started = false;
    var prev = null;
    return function(bg) {
      if (
        started &&
        bg.x === prev.x &&
        bg.y === prev.y &&
        bg.z === prev.z &&
        bg.w === prev.w &&
        bg.h === prev.h
      )
        { return }
      started = true;
      prev = bg;
      render(bg);
    }
  }

  var ImageElementRenderer = function ImageElementRenderer(element, image, options) {
    var this$1 = this;

    this.element = element;
    this.img = document.createElement('img');

    domScheduler.scheduler.write(function () {
      this$1.img.width = image.naturalWidth;
      this$1.img.height = image.naturalHeight;
      this$1.img.src = image.src;
      this$1.element.prepend(this$1.img);
    });

    this.render = dropRepeat(
      renderToStyle(this.img.style, image.naturalWidth, image.naturalHeight)
    );
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
    this.render = dropRepeat(
      renderToStyle(style, image.naturalWidth, image.naturalHeight)
    );
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
    return chainTransforms([
      coverElement(options.velocity),
      alignX(options.alignX),
      parallax(options.velocity)
    ])
  }

  var defaultOptions = {
    use3d: isChrome(),
    velocity: 0.8,
    alignX: 'center',
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
  exports.alignX = alignX;
  exports.parallax2d = parallax2d;
  exports.parallax3d = parallax3d;
  exports.chainTransforms = chainTransforms;
  exports.ImageElementRenderer = ImageElementRenderer;
  exports.PseudoElementRenderer = PseudoElementRenderer;

  return exports;

}({}, domScheduler));
