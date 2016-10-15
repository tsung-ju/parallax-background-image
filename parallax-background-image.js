'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var Parallax = function () {
    function Parallax(viewport) {
      var perspective = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;

      _classCallCheck(this, Parallax);

      if (typeof viewport === 'string') viewport = document.querySelector(viewport);

      _extends(viewport.style, {
        overflowY: 'scroll',
        transformStyle: 'flat',
        perspective: perspective + 'px',
        perspectiveOrigin: '0 0'
      });

      this.viewport = viewport;
      this.perspective = perspective;
    }

    _createClass(Parallax, [{
      key: 'add',
      value: function add(elements) {
        var velocityScale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.8;

        var _this = this;

        var backgroundPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '0px';
        var createBackground = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Parallax.before;

        if (velocityScale < 0) throw new RangeError('velocityScale must be positive');

        forEachElement(elements, function (element) {
          var elementStyle = window.getComputedStyle(element);
          if (elementStyle.position === 'static') {
            element.style.position = 'relative';
          }
          element.style.overflow = 'hidden';
          loadImage(parseCssUrl(elementStyle.backgroundImage), function (image) {
            var style = createBackground(element, image);

            _extends(style, {
              position: 'absolute',
              left: '0',
              top: backgroundPosition,
              width: '100%',
              transformOrigin: '0 0 0',
              pointerEvents: 'none'
            });

            var cache = [];
            var lastWidth = null;
            var lastHeight = null;
            var lastLeft = null;
            var lastViewportHeight = null;
            var updateStyle = function updateStyle() {
              var _element$getBoundingC = element.getBoundingClientRect();

              var width = _element$getBoundingC.width;
              var height = _element$getBoundingC.height;
              var left = _element$getBoundingC.left;

              var viewportHeight = _this.viewport.clientHeight;
              var deps = [width, height, left, viewportHeight];
              if (deps.some(function (dep, i) {
                return cache[i] !== dep;
              })) {
                cache = deps;

                var backgroundHeight = image.naturalHeight * (width / image.naturalWidth);
                var scale = 1 / velocityScale;

                style.height = backgroundHeight + 'px';
                style.transform = '\n                translateX(' + left * (scale - 1) + 'px)\n                translateY(' + ((viewportHeight - backgroundHeight) * scale - (viewportHeight - height)) / 2 + 'px)\n                translateZ(' + _this.perspective * (1 - scale) + 'px)\n                scale(' + scale + ', ' + scale + ')';
              }
              window.requestAnimationFrame(updateStyle);
            };
            updateStyle();
          });
        });
      }
    }]);

    return Parallax;
  }();

  Parallax.before = function () {
    var CLASS_NAME_PREFIX = 'parallax-background-';
    var nextId = 0;
    var styleSheet = null;

    return function (element, image) {
      if (styleSheet == null) styleSheet = createStyleSheet();

      var className = CLASS_NAME_PREFIX + nextId++;
      element.classList.add(className);

      var rule = '.' + className + '::before {\n        content: \'\';\n        background-image: url(' + image.src + ');\n        background-size: 100% 100%;\n      }';

      var index = styleSheet.insertRule(rule, 0);

      return styleSheet.cssRules[index].style;
    };
  }();

  Parallax.img = function (element, image) {
    element.insertBefore(image, element.firstChild);
    return image.style;
  };

  function createStyleSheet() {
    var style = document.createElement('style');
    style.appendChild(document.createTextNode(''));
    document.head.appendChild(style);
    return style.sheet;
  }

  function forEachElement(elements, callback) {
    if (elements instanceof Element) return callback(elements);
    if (typeof elements === 'string') {
      elements = document.querySelectorAll(elements);
    }
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = elements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var element = _step.value;
        callback(element);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

  function parseCssUrl(str) {
    return str.match(/url\(['"]?(.*?)['"]?\)/)[1];
  }

  function loadImage(src, callback) {
    var image = new Image();
    image.onload = function () {
      callback(image);
    };
    image.src = src;
  }

  window.Parallax = Parallax;
})();
