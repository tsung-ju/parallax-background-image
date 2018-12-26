var parallax = (function (exports) {
  'use strict';

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
  var CLASS_PARALLAX_VIEWPORT_3D =
    'parallax-background-image-viewport-3d';
  var CLASS_PARALLAX_ELEMENT = 'parallax-background-image-element';

  function injectStyle() {
    prependStyleSheet(STYLE);
  }

  var STYLE = "\n." + CLASS_PARALLAX_ELEMENT + " {\n  position: relative;\n  overflow: hidden !important;\n  background: none !important;\n  background-image: none !important;\n}\n\n." + CLASS_PARALLAX_ELEMENT + " > * {\n  position: relative;\n}\n\n." + CLASS_PARALLAX_VIEWPORT + " {\n  overflow-x: hidden !important;\n  overflow-y: scroll !important;\n  -webkit-overflow-scrolling: touch;\n}\n\n." + CLASS_PARALLAX_VIEWPORT_3D + " {\n  perspective: 1px !important;\n  perspective-origin: center center !important;\n}";

  function notEqual(a, b) {
    return a.x !== b.x || a.y !== b.y || a.z !== b.z || a.w !== b.w || a.h !== b.h
  }

  function copy_(a, b) {
    a.x = b.x;
    a.y = b.y;
    a.z = b.z;
    a.w = b.w;
    a.h = b.h;
  }

  var ParallaxElement = function ParallaxElement(element, image, options) {
    this.element = element;
    this.imageWidth = image.naturalWidth;
    this.imageHeight = image.naturalHeight;
    this.transform = options.transform(element, image, options);
    this.renderer = new options.renderer(element, image, options);

    this.bgRect = { x: NaN, y: NaN, z: NaN, w: NaN, h: NaN };
    this.dirty = false;

    this._setupStyle();
  };

  ParallaxElement.prototype._setupStyle = function _setupStyle () {
    this.element.classList.add(CLASS_PARALLAX_ELEMENT);
  };

  ParallaxElement.prototype.updateRect = function updateRect (elementRect, viewportRect) {
    var bgRect = { x: 0, y: 0, z: 0, w: this.imageWidth, h: this.imageHeight };
    this.transform(bgRect, elementRect, viewportRect);
    if (notEqual(this.bgRect, bgRect)) {
      this.dirty = true;
      copy_(this.bgRect, bgRect);
    }
  };

  ParallaxElement.prototype.render = function render () {
    if (!this.dirty) { return }
    this.dirty = false;
    this.renderer.render(this.bgRect);
  };

  ParallaxElement.prototype.dispose = function dispose () {
    this.element.classList.remove(CLASS_PARALLAX_ELEMENT);
    this.renderer.dispose();
  };

  function toElement(element, parent) {
    if (typeof element === 'string') {
      return parent.querySelector(element)
    } else {
      return element
    }
  }

  function toElementArray(elements, parent) {
    if (elements instanceof Element) {
      return [elements]
    } else {
      if (typeof elements === 'string') {
        elements = parent.querySelectorAll(elements);
      }
      return Array.prototype.slice.call(elements)
    }
  }

  function cssBackgroundImage(element) {
    var style = window.getComputedStyle(element);
    var src = /url\(['"]?(.*?)['"]?\)/.exec(style.backgroundImage)[1];
    return src
  }

  function loadImage(src, element) {
    return new Promise(function(resolve, reject) {
      if (typeof src === 'function') {
        src = src(element);
      }

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
    this.viewport = toElement(viewport, document);
    this.options = options;
    this.elements = [];

    this._setupStyle();
    this._monitorRects();
    this._startRenderLoop();
  };

  ParallaxViewport.prototype._setupStyle = function _setupStyle () {
    this.viewport.classList.add(CLASS_PARALLAX_VIEWPORT);
    if (this.options.use3d) {
      this.viewport.classList.add(CLASS_PARALLAX_VIEWPORT_3D);
    }
  };

  ParallaxViewport.prototype._monitorRects = function _monitorRects () {
    var _updateRects = this._updateRects.bind(this);
    window.addEventListener('resize', _updateRects);
    if (!this.options.use3d) {
      this.viewport.addEventListener('scroll', _updateRects);
    }
  };

  ParallaxViewport.prototype._updateRects = function _updateRects () {
    var viewportRect = getRect(this.viewport);
    for (var i = 0; i < this.elements.length; ++i) {
      var parallaxElement = this.elements[i];
      var elementRect = getRect(parallaxElement.element);
      subtract_(elementRect, viewportRect);
      parallaxElement.updateRect(elementRect, viewportRect);
    }
  };

  ParallaxViewport.prototype._startRenderLoop = function _startRenderLoop () {
    var elements = this.elements;
    function renderLoop() {
      for (var i = 0; i < elements.length; ++i) {
        elements[i].render();
      }
      window.requestAnimationFrame(renderLoop);
    }
    window.requestAnimationFrame(renderLoop);
  };

  ParallaxViewport.prototype.add = function add (elements, options) {
      var this$1 = this;
      if ( options === void 0 ) options = {};

    elements = toElementArray(elements, this.viewport);

    options = Object.assign({}, this.options, options);

    return elements.map(function (element) {
      return loadImage(options.image, element).then(function (image) {
        this$1.elements.push(new ParallaxElement(element, image, options));
        this$1._updateRects();
      })
    })
  };

  ParallaxViewport.prototype.remove = function remove (elements) {
    elements = toElementArray(elements, document);
    for (var i = 0; i < elements.length; ++i) {
      this._removeElement(element);
    }
  };

  ParallaxViewport.prototype._removeElement = function _removeElement (element) {
    for (var i = 0; i < this.elements.length; ++i) {
      if (this.elements[i].element === element) {
        this.elements[i].dispose();
        this.elements.splice(i, 1);
        return
      }
    }
  };

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

  function setupStyle(style, width, height) {
    style.position = 'absolute';
    style.left = '50%';
    style.top = '50%';
    style.width = width + "px";
    style.height = height + "px";
    style.transformOrigin = 'center center 0';
    style.pointerEvents = 'none';
  }

  function renderToStyle(style, width, height) {
    return function render(ref) {
      var x = ref.x;
      var y = ref.y;
      var z = ref.z;
      var w = ref.w;
      var h = ref.h;

      style.transform =
        "translate(-50%, -50%)" +
        "translate3d(" + x + "px, " + y + "px, " + z + "px)" +
        "scale(" + (w / width) + ", " + (h / height) + ")";
    }
  }

  var ImageElementRenderer = function ImageElementRenderer(element, image, options) {
    var this$1 = this;

    this.element = element;
    this.img = document.createElement('img');

    var style = this.img.style;
    var width = image.naturalWidth;
    var height = image.naturalHeight;

    window.requestAnimationFrame(function () {
      this$1.img.src = image.src;
      setupStyle(style, width, height);
      this$1.element.prepend(this$1.img);
    });

    this.render = renderToStyle(style, width, height);
  };

  ImageElementRenderer.prototype.dispose = function dispose () {
    this.element.removeChild(this.img);
  };

  function createStyle(selector, styleSheet) {
    var rule = selector + " {}";
    var index = styleSheet.insertRule(rule, 0);
    return styleSheet.cssRules[index].style
  }

  var styleSheet = appendStyleSheet();
  var nextId = 0;
  var PseudoElementRenderer = function PseudoElementRenderer(element, image, options) {
    var this$1 = this;

    this.element = element;
    var id = nextId++;
    this.className = "parallax-background-image-pseudo-" + id;

    var style = createStyle(("." + (this.className) + "::before"), styleSheet);
    var width = image.naturalWidth;
    var height = image.naturalHeight;

    window.requestAnimationFrame(function () {
      style.content = '""';
      style.backgroundImage = "url(" + (image.src) + ")";
      style.backgroundSize = '100% 100%';
      setupStyle(style, width, height);
      this$1.element.classList.add(this$1.className);
    });

    this.render = renderToStyle(style, width, height);
  };

  PseudoElementRenderer.prototype.dispose = function dispose () {
    this.element.classList.remove(this.className);
  };

  injectStyle();

  function isChrome() {
    var userAgent = navigator.userAgent;
    return (
      userAgent.indexOf('Chrome/') !== -1 && userAgent.indexOf('Edge/') === -1
    )
  }

  function defaultTransform(element, image, options) {
    var parallax = options.use3d ? parallax3d : parallax2d;
    var t1 = coverElement(options.velocity);
    var t2 = alignX(options.alignX);
    var t3 = parallax(options.velocity);

    return function(bg, element, viewport) {
      t1(bg, element, viewport);
      t2(bg, element, viewport);
      t3(bg, element, viewport);
    }
  }

  var defaultOptions = {
    use3d: isChrome(),
    velocity: 0.8,
    alignX: 'center',
    renderer: ImageElementRenderer,
    transform: defaultTransform,
    image: cssBackgroundImage
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

}({}));
