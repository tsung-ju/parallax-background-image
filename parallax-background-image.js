var Parallax = (function (mobx,_ray851107_domScheduler) {
'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};



function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}





function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var ATTR_PARALLAX_ELEMENT = 'data-parallax-element';

function toElement(element, parent) {
    if (parent === void 0) { parent = document; }
    if (typeof element === 'string') {
        return parent.querySelector(element);
    }
    else {
        return element;
    }
}
function toElementArray(elements, parent) {
    if (parent === void 0) { parent = document; }
    if (elements instanceof Element) {
        return [elements];
    }
    else if (Array.isArray(elements)) {
        return elements;
    }
    else {
        if (typeof elements === 'string') {
            elements = parent.querySelectorAll(elements);
        }
        return Array.prototype.slice.call(elements);
    }
}

function toFunction(toFunc) {
    if (typeof toFunc === 'function') {
        return toFunc;
    }
    return function () { return toFunc; };
}
function toAsyncFunction(toFunc) {
    var _this = this;
    var func = toFunction(toFunc);
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return new Promise(function (resolve) { return resolve(func.apply(_this, args)); });
    };
}

function loadBackgroundImage(el, getImage) {
    return toAsyncFunction(getImage)(el).then(loadImage);
}
function loadImage(src) {
    return new Promise(function (resolve, reject) {
        var image = document.createElement('img');
        image.onload = function (event) {
            resolve(event.target);
        };
        image.onerror = function (event) {
            reject(event.error);
        };
        image.src = src;
    });
}
var getCSSBackgroundImage = function (el) {
    var style = window.getComputedStyle(el);
    return parseCSSUrl(style.backgroundImage);
};
function parseCSSUrl(str) {
    return str.match(/url\(['"]?(.*?)['"]?\)/)[1];
}

function appendStyleSheet() {
    var style = createStyleElement();
    document.head.appendChild(style);
    return style.sheet;
}
function prependStyleSheet() {
    var style = createStyleElement();
    document.head.insertBefore(style, document.head.firstElementChild);
    return style.sheet;
}
function createStyleElement() {
    var style = document.createElement('style');
    style.appendChild(document.createTextNode(''));
    return style;
}

var StyleBackground = (function () {
    function StyleBackground(style, width, height) {
        this.style = style;
        this.width = width;
        this.height = height;
        _ray851107_domScheduler.scheduler.write(function () {
            style.position = 'absolute';
            style.left = '0';
            style.top = '0';
            style.transformOrigin = '0 0 0';
            style.pointerEvents = 'none';
        });
    }
    StyleBackground.prototype.updateTransform = function (transform) {
        var _this = this;
        var style = "\n            translateX(" + transform.translateX + "px)\n            translateY(" + transform.translateY + "px)\n            translateZ(" + transform.translateZ + "px)\n            scale(" + transform.scale + ", " + transform.scale + ")";
        _ray851107_domScheduler.scheduler.write(function () { _this.style.transform = style; });
    };
    return StyleBackground;
}());
var ScaleBackground = (function () {
    function ScaleBackground(background) {
        this.background = background;
    }
    ScaleBackground.prototype.updateTransform = function (transform) {
        this.background.updateTransform(__assign({}, transform, { scale: transform.scale * this.scale }));
    };
    Object.defineProperty(ScaleBackground.prototype, "height", {
        get: function () {
            return this.background.height * this.scale;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScaleBackground.prototype, "width", {
        get: function () {
            return this.background.width * this.scale;
        },
        enumerable: true,
        configurable: true
    });
    return ScaleBackground;
}());
__decorate([
    mobx.computed
], ScaleBackground.prototype, "height", null);
__decorate([
    mobx.computed
], ScaleBackground.prototype, "width", null);
var CoverScaleBackground = (function (_super) {
    __extends(CoverScaleBackground, _super);
    function CoverScaleBackground(background, coveredElement) {
        var _this = _super.call(this, background) || this;
        _this.element = coveredElement;
        return _this;
    }
    Object.defineProperty(CoverScaleBackground.prototype, "scale", {
        get: function () {
            return Math.max(this.minimalHeight / this.background.height, this.minimalWidth / this.background.width);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CoverScaleBackground.prototype, "minimalHeight", {
        get: function () {
            var viewportHeight = this.element.viewport.height;
            var _a = this.element, elementHeight = _a.height, velocityScale = _a.velocityScale;
            var coverWindowTop = viewportHeight + velocityScale * (viewportHeight - elementHeight);
            return coverWindowTop;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CoverScaleBackground.prototype, "minimalWidth", {
        get: function () {
            return this.element.width;
        },
        enumerable: true,
        configurable: true
    });
    return CoverScaleBackground;
}(ScaleBackground));
__decorate([
    mobx.computed
], CoverScaleBackground.prototype, "scale", null);
__decorate([
    mobx.computed
], CoverScaleBackground.prototype, "minimalHeight", null);
__decorate([
    mobx.computed
], CoverScaleBackground.prototype, "minimalWidth", null);
function coverElement(createBackground, coveredElement) {
    if (coveredElement === void 0) { coveredElement = null; }
    return function (el, image) {
        var background = createBackground(el, image);
        return new CoverScaleBackground(background, coveredElement || el);
    };
}
var pseudoBefore = function (el, image) {
    var rule = "[" + ATTR_PARALLAX_ELEMENT + "=\"" + el.id + "\"]::before {\n        content: '';\n        width: " + image.naturalWidth + "px;\n        height: " + image.naturalHeight + "px;\n        background-image: url(" + image.src + ");\n        background-size: 100% 100%;\n    }";
    var index = styleSheet.insertRule(rule, 0);
    var style = styleSheet.cssRules[index].style;
    return new StyleBackground(style, image.naturalWidth, image.naturalHeight);
};
var insertImg = function (el, image) {
    var img = document.createElement('img');
    _ray851107_domScheduler.scheduler.write(function () {
        img.height = image.naturalHeight;
        img.width = image.naturalWidth;
        img.src = image.src;
        el.element.insertBefore(img, el.element.firstElementChild);
    });
    return new StyleBackground(img.style, image.naturalWidth, image.naturalHeight);
};
var styleSheet = appendStyleSheet();

var defaultOptions = {
    velocityScale: 0.8,
    horizontalAlign: 0.5,
    backgroundImage: getCSSBackgroundImage,
    createBackground: coverElement(insertImg)
};
function fromPartial(options) {
    return __assign({}, defaultOptions, options);
}

var ObservableBoundingClientRect = (function () {
    function ObservableBoundingClientRect(element) {
        var _this = this;
        this.bottom = 0;
        this.height = 0;
        this.left = 0;
        this.right = 0;
        this.top = 0;
        this.width = 0;
        var watch = function () {
            _this.update(element.getBoundingClientRect());
            _ray851107_domScheduler.scheduler.read(watch);
        };
        _ray851107_domScheduler.scheduler.read(watch);
    }
    ObservableBoundingClientRect.prototype.update = function (rect) {
        this.bottom = rect.bottom;
        this.height = rect.height;
        this.left = rect.left;
        this.right = rect.right;
        this.top = rect.top;
        this.width = rect.width;
    };
    return ObservableBoundingClientRect;
}());
__decorate([
    mobx.observable
], ObservableBoundingClientRect.prototype, "bottom", void 0);
__decorate([
    mobx.observable
], ObservableBoundingClientRect.prototype, "height", void 0);
__decorate([
    mobx.observable
], ObservableBoundingClientRect.prototype, "left", void 0);
__decorate([
    mobx.observable
], ObservableBoundingClientRect.prototype, "right", void 0);
__decorate([
    mobx.observable
], ObservableBoundingClientRect.prototype, "top", void 0);
__decorate([
    mobx.observable
], ObservableBoundingClientRect.prototype, "width", void 0);
__decorate([
    mobx.action
], ObservableBoundingClientRect.prototype, "update", null);

var Viewport = (function () {
    function Viewport(element, perspective) {
        element.style.overflowY = 'scroll';
        element.style['webkitOverflowScrolling'] = 'touch';
        element.style.transformStyle = 'flat';
        if (perspective !== Infinity) {
            element.style.perspective = perspective + 'px';
            element.style.perspectiveOrigin = '0 0';
        }
        this.element = element;
        this.perspective = perspective;
        this.boundingClientRect = new ObservableBoundingClientRect(element);
    }
    Object.defineProperty(Viewport.prototype, "height", {
        get: function () {
            return this.boundingClientRect.height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Viewport.prototype, "top", {
        get: function () {
            return this.boundingClientRect.top;
        },
        enumerable: true,
        configurable: true
    });
    return Viewport;
}());
__decorate([
    mobx.computed
], Viewport.prototype, "height", null);
__decorate([
    mobx.computed
], Viewport.prototype, "top", null);

var ParallaxElement = (function () {
    function ParallaxElement(element, viewport, velocityScale) {
        var _this = this;
        this.id = ParallaxElement.getNextId();
        this.element = element;
        this.boundingClientRect = new ObservableBoundingClientRect(element);
        this.viewport = viewport;
        this.velocityScale = velocityScale;
        _ray851107_domScheduler.scheduler.write(function () {
            _this.element.setAttribute(ATTR_PARALLAX_ELEMENT, _this.id);
        });
    }
    Object.defineProperty(ParallaxElement.prototype, "width", {
        get: function () {
            return this.boundingClientRect.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParallaxElement.prototype, "height", {
        get: function () {
            return this.boundingClientRect.height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParallaxElement.prototype, "left", {
        get: function () {
            return this.boundingClientRect.left;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParallaxElement.prototype, "top", {
        get: function () {
            return this.boundingClientRect.top;
        },
        enumerable: true,
        configurable: true
    });
    ParallaxElement.getNextId = function () {
        return "" + ParallaxElement.nextId++;
    };
    return ParallaxElement;
}());
ParallaxElement.nextId = 0;
__decorate([
    mobx.computed
], ParallaxElement.prototype, "width", null);
__decorate([
    mobx.computed
], ParallaxElement.prototype, "height", null);
__decorate([
    mobx.computed
], ParallaxElement.prototype, "left", null);
__decorate([
    mobx.computed
], ParallaxElement.prototype, "top", null);

function parallaxTransform(element, background) {
    var scale = 1 / element.velocityScale;
    var viewport = element.viewport;
    return {
        scale: scale,
        translateX: element.left * (scale - 1),
        translateY: ((viewport.height - background.height) * scale - (viewport.height - element.height)) / 2,
        translateZ: viewport.perspective * (1 - scale)
    };
}
function fallbackTransform(element, background) {
    var viewport = element.viewport;
    var viewportCenter = viewport.top + viewport.height / 2;
    var elementCenter = element.top + element.height / 2;
    var backgroundCenter = element.top + background.height / 2;
    return {
        scale: 1,
        translateX: 0,
        translateY: (elementCenter - viewportCenter) * (element.velocityScale - 1) - (backgroundCenter - elementCenter),
        translateZ: 0
    };
}
function horizontalAlign(element, background, value) {
    return function (transform) { return (__assign({}, transform, { translateX: transform.translateX - (background.width - element.width) * transform.scale * value })); };
}

initialize();
function initialize() {
    var styleSheet = prependStyleSheet();
    styleSheet.insertRule("\n        [" + ATTR_PARALLAX_ELEMENT + "] > * {\n            position: relative;\n        }\n    ", 0);
    styleSheet.insertRule("\n        [" + ATTR_PARALLAX_ELEMENT + "] {\n            position: relative;\n            overflow: hidden;\n        }\n    ", 0);
}
var Parallax$1 = (function () {
    function Parallax(element, useFallback, perspective) {
        if (useFallback === void 0) { useFallback = !isChrome(); }
        if (perspective === void 0) { perspective = 1000; }
        if (useFallback) {
            perspective = Infinity;
        }
        this.useFallback = useFallback;
        this.viewport = new Viewport(toElement(element), perspective);
    }
    Parallax.prototype.add = function (elements, partial) {
        var _this = this;
        if (partial === void 0) { partial = {}; }
        var options = fromPartial(partial);
        if (options.velocityScale < 0)
            throw new RangeError('velocityScale must be positive');
        return toElementArray(elements, this.viewport.element)
            .filter(function (element) { return !element.hasAttribute(ATTR_PARALLAX_ELEMENT); })
            .map(function (element) { return _this.addElement(element, options); });
    };
    Parallax.prototype.addElement = function (element, options) {
        return __awaiter(this, void 0, void 0, function () {
            var image, parallaxElement, background, getTransform, align;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, loadBackgroundImage(element, options.backgroundImage)];
                    case 1:
                        image = _a.sent();
                        parallaxElement = new ParallaxElement(element, this.viewport, options.velocityScale);
                        removeBackground(element);
                        background = options.createBackground(parallaxElement, image);
                        getTransform = this.useFallback ? fallbackTransform : parallaxTransform;
                        align = horizontalAlign(parallaxElement, background, options.horizontalAlign);
                        mobx.autorun(function () {
                            var transform = getTransform(parallaxElement, background);
                            background.updateTransform(align(transform));
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    return Parallax;
}());
Parallax$1.getCSSBackgroundImage = getCSSBackgroundImage;
Parallax$1.pesudoBefore = pseudoBefore;
Parallax$1.insertImg = insertImg;
Parallax$1.coverElement = coverElement;
function isChrome() {
    var userAgent = navigator.userAgent;
    return userAgent.indexOf('Chrome/') !== -1 && userAgent.indexOf('Edge/') === -1;
}
function removeBackground(element) {
    element.style.setProperty('background', 'none', 'important');
    element.style.setProperty('background-image', 'none', 'important');
}

return Parallax$1;

}(mobx,domScheduler));
