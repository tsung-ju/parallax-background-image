'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var Parallax = function () {
    function Parallax() {
      var viewport = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;
      var perspective = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;

      _classCallCheck(this, Parallax);

      if (typeof viewport === 'string') viewport = document.querySelector(viewport);

      _extends(viewport.style, {
        overflowY: 'scroll',
        perspective: perspective + 'px',
        perspectiveOrigin: '0 0'
      });

      this.viewport = viewport;
      this.perspective = perspective;
    }

    _createClass(Parallax, [{
      key: 'add',
      value: function add(elements) {
        var initialPosition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        var _this = this;

        var velocityScale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.8;
        var createBackground = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Parallax.before;

        if (velocityScale < 0) throw new RangeError('velocityScale must be positive');

        forEachElement(elements, function (element) {
          var elementStyle = window.getComputedStyle(element);
          if (elementStyle.position === 'static') {
            element.style.position = 'relative';
          }
          loadImage(parseCssUrl(elementStyle.backgroundImage), function (image) {
            var style = createBackground(element, image);

            _extends(style, {
              position: 'absolute',
              left: '0',
              top: '0',
              width: '100%',
              transformOrigin: '0 0 0',
              pointerEvents: 'none'
            });

            var updateStyle = function updateStyle() {
              var elementRect = element.getBoundingClientRect();
              var elementDisplacement = (window.innerHeight + elementRect.height) * -1;

              var backgroundHeight = image.naturalHeight * elementRect.height / elementRect.width;
              var backgroundInitialPosition = initialPosition * backgroundHeight;
              var backgroundDisplacement = velocityScale * elementDisplacement;

              var scale = elementDisplacement / (backgroundDisplacement - backgroundInitialPosition);
              var translateZ = _this.perspective * (1 - scale);
              var translateY = (window.innerHeight - backgroundDisplacement) * scale + elementRect.height;
              var translateX = elementRect.left * (scale - 1);

              style.height = backgroundHeight + 'px';
              style.transform = 'translate3d(' + translateX + 'px, ' + translateY + 'px, ' + translateZ + 'px) scale(' + scale + ', ' + scale + ')';

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

      var rule = '.' + className + '::before {\n        content: \' \';\n      }';

      var index = styleSheet.insertRule(rule, 0);

      return styleSheet.cssRules[index];
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