var Parallax = (function (mobx, domScheduler) {
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

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
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
        return (...args) => toFunc;
    }
    function toAsyncFunction(toFunc) {
        const func = toFunction(toFunc);
        return (...args) => new Promise(resolve => resolve(func.apply(this, args)));
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
            domScheduler.scheduler.write(() => {
                style.position = 'absolute';
                style.left = '0';
                style.top = '0';
                style.transformOrigin = '0 0 0';
                style.pointerEvents = 'none';
            });
        }
        updateTransform(transform) {
            const style = `
            translateX(${transform.translateX}px)
            translateY(${transform.translateY}px)
            translateZ(${transform.translateZ}px)
            scale(${transform.scale}, ${transform.scale})`;
            domScheduler.scheduler.write(() => { this.style.transform = style; });
        }
    }
    class ScaleBackground {
        constructor(background) {
            this.background = background;
        }
        updateTransform(transform) {
            this.background.updateTransform(Object.assign({}, transform, { scale: transform.scale * this.scale }));
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
            const viewportHeight = this.element.viewport.rect.height;
            const elementHeight = this.element.rect.height;
            const { velocityScale } = this.element;
            const coverWindowTop = viewportHeight + velocityScale * (viewportHeight - elementHeight);
            return coverWindowTop;
        }
        get minimalWidth() {
            return this.element.rect.width;
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
            const background = createBackground(el, image);
            return new CoverScaleBackground(background, coveredElement || el);
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
        domScheduler.scheduler.write(() => {
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
        horizontalAlign: 0.5,
        backgroundImage: getCSSBackgroundImage,
        createBackground: coverElement(insertImg)
    };
    function fromPartial(options) {
        return Object.assign({}, defaultOptions, options);
    }

    class ObservableRect {
        constructor(element) {
            this.left = 0;
            this.top = 0;
            this.width = 0;
            this.height = 0;
            const watch = () => {
                this.update(element.getBoundingClientRect());
                domScheduler.scheduler.read(watch);
            };
            domScheduler.scheduler.read(watch);
        }
        update(rect) {
            this.left = rect.left;
            this.top = rect.top;
            this.width = rect.width;
            this.height = rect.height;
        }
    }
    __decorate([
        mobx.observable
    ], ObservableRect.prototype, "left", void 0);
    __decorate([
        mobx.observable
    ], ObservableRect.prototype, "top", void 0);
    __decorate([
        mobx.observable
    ], ObservableRect.prototype, "width", void 0);
    __decorate([
        mobx.observable
    ], ObservableRect.prototype, "height", void 0);
    __decorate([
        mobx.action
    ], ObservableRect.prototype, "update", null);

    class Viewport {
        constructor(element, perspective) {
            element.style.overflowY = 'scroll';
            element.style['webkitOverflowScrolling'] = 'touch';
            element.style.transformStyle = 'flat';
            if (perspective !== Infinity) {
                element.style.perspective = perspective + 'px';
                element.style.perspectiveOrigin = '0 0';
            }
            this.element = element;
            this.perspective = perspective;
            this.rect = new ObservableRect(element);
        }
    }

    class ParallaxElement {
        constructor(element, viewport, velocityScale) {
            this.id = ParallaxElement.getNextId();
            this.element = element;
            this.rect = new ObservableRect(element);
            this.viewport = viewport;
            this.velocityScale = velocityScale;
            domScheduler.scheduler.write(() => {
                this.element.setAttribute(ATTR_PARALLAX_ELEMENT, this.id);
            });
        }
        static getNextId() {
            return `${ParallaxElement.nextId++}`;
        }
    }
    ParallaxElement.nextId = 0;

    function parallaxTransform(element, background) {
        const scale = 1 / element.velocityScale;
        const viewport = element.viewport;
        return {
            scale,
            translateX: element.rect.left * (scale - 1),
            translateY: ((viewport.rect.height - background.height) * scale - (viewport.rect.height - element.rect.height)) / 2,
            translateZ: viewport.perspective * (1 - scale)
        };
    }
    function fallbackTransform(element, background) {
        const viewport = element.viewport;
        const viewportCenter = viewport.rect.top + viewport.rect.height / 2;
        const elementCenter = element.rect.top + element.rect.height / 2;
        const backgroundCenter = element.rect.top + background.height / 2;
        return {
            scale: 1,
            translateX: 0,
            translateY: (elementCenter - viewportCenter) * (element.velocityScale - 1) - (backgroundCenter - elementCenter),
            translateZ: 0
        };
    }
    function horizontalAlign(element, background, value) {
        return (transform) => (Object.assign({}, transform, { translateX: transform.translateX - (background.width - element.rect.width) * transform.scale * value }));
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
    class Parallax {
        constructor(element, useFallback = !isChrome(), perspective = 1000) {
            if (useFallback) {
                perspective = Infinity;
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
                const align = horizontalAlign(parallaxElement, background, options.horizontalAlign);
                mobx.autorun(() => {
                    const transform = getTransform(parallaxElement, background);
                    background.updateTransform(align(transform));
                });
            });
        }
    }
    Parallax.getCSSBackgroundImage = getCSSBackgroundImage;
    Parallax.pesudoBefore = pseudoBefore;
    Parallax.insertImg = insertImg;
    Parallax.coverElement = coverElement;
    function isChrome() {
        const { userAgent } = navigator;
        return userAgent.indexOf('Chrome/') !== -1 && userAgent.indexOf('Edge/') === -1;
    }
    function removeBackground(element) {
        element.style.setProperty('background', 'none', 'important');
        element.style.setProperty('background-image', 'none', 'important');
    }

    return Parallax;

}(mobx, domScheduler));
