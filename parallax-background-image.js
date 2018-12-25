var parallax = (function (exports) {
  'use strict';

  function consume_(tasks) {
    var len = tasks.length;
    for (var i = 0; i < len; ++i) {
      tasks.shift()();
    }
  }

  var Scheduler = function Scheduler() {
    this.reads = [];
    this.writes = [];
    this.running = false;
  };

  Scheduler.prototype.read = function read (task) {
    this.reads.push(task);
    if (!this.running) { this.run(); }
  };

  Scheduler.prototype.write = function write (task) {
    this.writes.push(task);
    if (!this.running) { this.run(); }
  };

  Scheduler.prototype.run = function run () {
      var this$1 = this;

    this.running = true;
    window.requestAnimationFrame(function () {
      consume_(this$1.reads);
      consume_(this$1.writes);

      if (this$1.reads.length === 0 && this$1.writes.length === 0) {
        this$1.running = false;
      } else {
        this$1.run();
      }
    });
  };

  var scheduler = new Scheduler();

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
    this.transform = options.transform(element, image, options);
    this.renderer = new options.renderer(element, image, options);
    this.imageWidth = image.naturalWidth;
    this.imageHeight = image.naturalHeight;

    this.bgRect = { x: NaN, y: NaN, z: NaN, w: NaN, h: NaN };
    this.dirty = false;

    element.classList.add(CLASS_PARALLAX_ELEMENT);
  };

  ParallaxElement.prototype.layout = function layout (elementRect, viewportRect) {
    var bgRect = { x: 0, y: 0, z: 0, w: this.imageWidth, h: this.imageHeight };
    this.transform(bgRect, elementRect, viewportRect);
    if (this.bgRect == null || notEqual(this.bgRect, bgRect)) {
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

  function loadBackgroundImage(element, src, options) {
    return toAsyncFunction(src)(element, options).then(loadImage)
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
    var use3d = options.use3d;
    var scheduler = options.scheduler;
    viewport = toElement(viewport, document);
    this.viewport = viewport;
    this.options = options;
    this.elements = [];

    viewport.classList.add(CLASS_PARALLAX_VIEWPORT);
    if (use3d) {
      viewport.classList.add(CLASS_PARALLAX_VIEWPORT_3D);
    }

    this._startReadLoop(viewport, this.elements, scheduler);
    this._startWriteLoop(this.elements, scheduler);
  };

  ParallaxViewport.prototype._startReadLoop = function _startReadLoop (viewport, elements, scheduler) {
    function readLoop() {
      var viewportRect = getRect(viewport);
      for (var i = 0; i < elements.length; ++i) {
        var elementRect = getRect(elements[i].element);
        subtract_(elementRect, viewportRect);
        elements[i].layout(elementRect, viewportRect);
      }
      scheduler.read(readLoop);
    }
    scheduler.read(readLoop);
  };

  ParallaxViewport.prototype._startWriteLoop = function _startWriteLoop (elements, scheduler) {
    function writeLoop() {
      for (var i = 0; i < elements.length; ++i) {
        elements[i].render();
      }
      scheduler.write(writeLoop);
    }
    scheduler.write(writeLoop);
  };

  ParallaxViewport.prototype.add = function add (elements, options) {
      var this$1 = this;
      if ( options === void 0 ) options = {};

    elements = toElementArray(elements, this.viewport);

    options = Object.assign({}, this.options, options);

    return elements.map(function (element) {
      return loadBackgroundImage(element, options.backgroundImage).then(
        function (image) {
          this$1.elements.push(new ParallaxElement(element, image, options));
        }
      )
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
    var scheduler = options.scheduler;
    var img = document.createElement('img');
    var style = img.style;

    var src = image.src;
    var width = image.naturalWidth;
    var height = image.naturalHeight;

    scheduler.write(function() {
      img.src = src;
      element.prepend(img);
      setupStyle(style, width, height);
    });

    this.element = element;
    this.img = img;
    this.render = renderToStyle(style, width, height);
  };

  ImageElementRenderer.prototype.dispose = function dispose () {
    this.element.removeChild(this.img);
  };

  var styleSheet = appendStyleSheet();
  var nextId = 0;
  var PseudoElementRenderer = function PseudoElementRenderer(element, image, options) {
    var scheduler = options.scheduler;
    this.element = element;
    var id = nextId++;
    this.className = "parallax-background-image-pseudo-" + id;

    this.element.classList.add(this.className);

    var rule = "." + (this.className) + "::before {}";
    var index = styleSheet.insertRule(rule, 0);
    var style = styleSheet.cssRules[index].style;

    var src = image.src;
    var width = image.naturalWidth;
    var height = image.naturalHeight;
    scheduler.write(function() {
      style.content = '';
      style.backgroundImage = "url(" + src + ")";
      style.backgroundSize = '100% 100%';
      setupStyle(style, width, height);
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
    scheduler: scheduler,
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

}({}));
