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

const ATTR_PARALLAX_ELEMENT = 'data-parallax-element';

function toElement(element, parent = document) {
    if (typeof element === 'string') {
        return parent.querySelector(element);
    }
    else {
        return element;
    }
}
function toElementArray(elements, parent = document) {
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
    return () => toFunc;
}
function toAsyncFunction(toFunc) {
    const func = toFunction(toFunc);
    return function () { return new Promise(resolve => resolve(func.apply(this, arguments))); };
}

function loadBackgroundImage(el, getImage) {
    return toAsyncFunction(getImage)(el).then(loadImage);
}
function loadImage(src) {
    return new Promise((resolve, reject) => {
        const image = document.createElement('img');
        image.onload = (event) => {
            resolve(event.target);
        };
        image.onerror = (event) => {
            reject(event.error);
        };
        image.src = src;
    });
}
const getCSSBackgroundImage = (el) => {
    const style = window.getComputedStyle(el);
    return parseCSSUrl(style.backgroundImage);
};
function parseCSSUrl(str) {
    return str.match(/url\(['"]?(.*?)['"]?\)/)[1];
}

function appendStyleSheet() {
    const style = createStyleElement();
    document.head.appendChild(style);
    return style.sheet;
}
function prependStyleSheet() {
    const style = createStyleElement();
    document.head.insertBefore(style, document.head.firstElementChild);
    return style.sheet;
}
function createStyleElement() {
    const style = document.createElement('style');
    style.appendChild(document.createTextNode(''));
    return style;
}

class StyleBackground {
    constructor(style, width, height) {
        this.style = style;
        this.width = width;
        this.height = height;
        _ray851107_domScheduler.scheduler.write(() => {
            Object.assign(style, {
                position: 'absolute',
                left: '0',
                top: '0',
                transformOrigin: '0 0 0',
                pointerEvents: 'none'
            });
        });
    }
    updateTransform(transform) {
        const style = `
            translateX(${transform.translateX}px)
            translateY(${transform.translateY}px)
            translateZ(${transform.translateZ}px)
            scale(${transform.scale}, ${transform.scale})`;
        _ray851107_domScheduler.scheduler.write(() => { this.style.transform = style; });
    }
}
class ScaleBackground {
    constructor(background) {
        this.background = background;
    }
    updateTransform(transform) {
        this.background.updateTransform(Object.assign({}, transform, {
            scale: transform.scale * this.scale
        }));
    }
    get height() {
        return this.background.height * this.scale;
    }
    get width() {
        return this.background.width * this.scale;
    }
}
__decorate([
    mobx.computed
], ScaleBackground.prototype, "height", null);
__decorate([
    mobx.computed
], ScaleBackground.prototype, "width", null);
class CoverScaleBackground extends ScaleBackground {
    constructor(background, coveredElement) {
        super(background);
        this.element = coveredElement;
    }
    get scale() {
        return Math.max(this.minimalHeight / this.background.height, this.minimalWidth / this.background.width);
    }
    get minimalHeight() {
        const { height: viewportHeight } = this.element.viewport;
        const { height: elementHeight, velocityScale } = this.element;
        const coverElementTop = velocityScale > 1
            ? elementHeight + (velocityScale - 1) * (viewportHeight + elementHeight)
            : elementHeight + (1 - velocityScale) * (viewportHeight - elementHeight);
        const coverWindowTop = viewportHeight + velocityScale * (viewportHeight - elementHeight);
        return Math.max(coverElementTop, coverWindowTop);
    }
    get minimalWidth() {
        return this.element.width;
    }
}
__decorate([
    mobx.computed
], CoverScaleBackground.prototype, "scale", null);
__decorate([
    mobx.computed
], CoverScaleBackground.prototype, "minimalHeight", null);
__decorate([
    mobx.computed
], CoverScaleBackground.prototype, "minimalWidth", null);
function coverElement(createBackground, coveredElement = null) {
    return (el, image) => {
        coveredElement = coveredElement || el;
        const background = createBackground(el, image);
        return new CoverScaleBackground(background, coveredElement);
    };
}
const pseudoBefore = (el, image) => {
    const rule = `[${ATTR_PARALLAX_ELEMENT}="${el.id}"]::before {
        content: '';
        width: ${image.naturalWidth}px;
        height: ${image.naturalHeight}px;
        background-image: url(${image.src});
        background-size: 100% 100%;
    }`;
    const index = styleSheet.insertRule(rule, 0);
    const style = styleSheet.cssRules[index].style;
    return new StyleBackground(style, image.naturalWidth, image.naturalHeight);
};
const insertImg = (el, image) => {
    const img = document.createElement('img');
    _ray851107_domScheduler.scheduler.write(() => {
        img.height = image.naturalHeight;
        img.width = image.naturalWidth;
        img.src = image.src;
        el.element.insertBefore(img, el.element.firstElementChild);
    });
    return new StyleBackground(img.style, image.naturalWidth, image.naturalHeight);
};
const styleSheet = appendStyleSheet();

const defaultOptions = {
    velocityScale: 0.8,
    backgroundImage: getCSSBackgroundImage,
    createBackground: coverElement(insertImg)
};
function fromPartial(options) {
    return Object.assign({}, defaultOptions, options);
}

class ObservableBoundingClientRect {
    constructor(element) {
        this.bottom = 0;
        this.height = 0;
        this.left = 0;
        this.right = 0;
        this.top = 0;
        this.width = 0;
        const watch = () => {
            this.update(element.getBoundingClientRect());
            _ray851107_domScheduler.scheduler.read(watch);
        };
        _ray851107_domScheduler.scheduler.read(watch);
    }
    update(rect) {
        this.bottom = rect.bottom;
        this.height = rect.height;
        this.left = rect.left;
        this.right = rect.right;
        this.top = rect.top;
        this.width = rect.width;
    }
}
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

class Viewport {
    constructor(element, perspective) {
        Object.assign(element.style, {
            overflowY: 'scroll',
            webkitOverflowScrolling: 'touch',
            transformStyle: 'flat',
            perspective: perspective + 'px',
            perspectiveOrigin: '0 0'
        });
        this.element = element;
        this.perspective = perspective;
        this.boundingClientRect = new ObservableBoundingClientRect(element);
    }
    get height() {
        return this.boundingClientRect.height;
    }
    get top() {
        return this.boundingClientRect.top;
    }
}
__decorate([
    mobx.computed
], Viewport.prototype, "height", null);
__decorate([
    mobx.computed
], Viewport.prototype, "top", null);

class ParallaxElement {
    constructor(element, viewport, velocityScale) {
        this.id = ParallaxElement.getNextId();
        this.element = element;
        this.boundingClientRect = new ObservableBoundingClientRect(element);
        this.viewport = viewport;
        this.velocityScale = velocityScale;
        _ray851107_domScheduler.scheduler.write(() => {
            this.element.setAttribute(ATTR_PARALLAX_ELEMENT, this.id);
        });
    }
    get width() {
        return this.boundingClientRect.width;
    }
    get height() {
        return this.boundingClientRect.height;
    }
    get left() {
        return this.boundingClientRect.left;
    }
    get top() {
        return this.boundingClientRect.top;
    }
    static getNextId() {
        return `${ParallaxElement.nextId++}`;
    }
}
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
    const scale = 1 / element.velocityScale;
    const viewport = element.viewport;
    return {
        scale,
        translateX: element.left * (scale - 1),
        translateY: ((viewport.height - background.height) * scale - (viewport.height - element.height)) / 2,
        translateZ: viewport.perspective * (1 - scale)
    };
}
function fallbackTransform(element, background) {
    const viewport = element.viewport;
    const viewportCenter = viewport.top + viewport.height / 2;
    const elementCenter = element.top + element.height / 2;
    const backgroundCenter = element.top + background.height / 2;
    return {
        scale: 1,
        translateX: 0,
        translateY: (elementCenter - viewportCenter) * (element.velocityScale - 1) - (backgroundCenter - elementCenter),
        translateZ: 0
    };
}

initialize();
function initialize() {
    const styleSheet = prependStyleSheet();
    styleSheet.insertRule(`
        [${ATTR_PARALLAX_ELEMENT}] > * {
            position: relative;
        }
    `, 0);
    styleSheet.insertRule(`
        [${ATTR_PARALLAX_ELEMENT}] {
            position: relative;
            overflow: hidden;
        }
    `, 0);
}
class Parallax$1 {
    constructor(element, useFallback = !isChrome(), perspective = 1000) {
        if (useFallback) {
            perspective = 0;
        }
        this.useFallback = useFallback;
        this.viewport = new Viewport(toElement(element), perspective);
    }
    add(elements, partial = {}) {
        const options = fromPartial(partial);
        if (options.velocityScale < 0)
            throw new RangeError('velocityScale must be positive');
        return toElementArray(elements, this.viewport.element)
            .filter(element => !element.hasAttribute(ATTR_PARALLAX_ELEMENT))
            .map(element => this.addElement(element, options));
    }
    addElement(element, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const image = yield loadBackgroundImage(element, options.backgroundImage);
            const parallaxElement = new ParallaxElement(element, this.viewport, options.velocityScale);
            removeBackground(element);
            const background = options.createBackground(parallaxElement, image);
            const getTransform = this.useFallback ? fallbackTransform : parallaxTransform;
            mobx.autorun(() => {
                const transform = getTransform(parallaxElement, background);
                background.updateTransform(transform);
            });
        });
    }
}
Parallax$1.getCSSBackgroundImage = getCSSBackgroundImage;
Parallax$1.pesudoBefore = pseudoBefore;
Parallax$1.insertImg = insertImg;
Parallax$1.coverElement = coverElement;
function isChrome() {
    const { userAgent } = navigator;
    return userAgent.includes('Chrome/') && !userAgent.includes('Edge/');
}
function removeBackground(element) {
    element.style.setProperty('background', 'none', 'important');
    element.style.setProperty('background-image', 'none', 'important');
}

return Parallax$1;

}(mobx,domScheduler));
