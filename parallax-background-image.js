(function (mobx) {
'use strict';

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

var __awaiter$1 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function toFunction(toFunc) {
    if (typeof toFunc === 'function') {
        return toFunc;
    }
    return () => toFunc;
}
function toAsyncFunction(toFunc) {
    const func = toFunction(toFunc);
    return function () {
        return __awaiter$1(this, arguments, void 0, function* () { return yield func.apply(this, arguments); });
    };
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

class SchedulerImpl {
    constructor() {
        this.reads = [];
        this.writes = [];
    }
    read(task) {
        this.reads.push(task);
    }
    write(task) {
        this.writes.push(task);
    }
    runOnce() {
        const reads = this.reads;
        this.reads = [];
        reads.forEach(task => task());
        const writes = this.writes;
        this.writes = [];
        writes.forEach(task => task());
    }
    run() {
        const loop = () => {
            this.runOnce();
            window.requestAnimationFrame(loop);
        };
        loop();
    }
}
const scheduler = new SchedulerImpl();

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
class StyleBackground {
    constructor(style, width, height) {
        this.style = style;
        this.width = width;
        this.height = height;
        Object.assign(style, {
            position: 'absolute',
            left: '0',
            top: '0',
            transformOrigin: '0 0 0',
            pointerEvents: 'none'
        });
    }
    updateTransform(transform) {
        scheduler.write(() => {
            this.style.transform = `
                translateX(${transform.translateX}px)
                translateY(${transform.translateY}px)
                translateZ(${transform.translateZ}px)
                scale(${transform.scale}, ${transform.scale})`;
        });
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
    img.height = image.naturalHeight;
    img.width = image.naturalWidth;
    img.src = image.src;
    el.element.insertBefore(img, el.element.firstElementChild);
    return new StyleBackground(img.style, image.naturalWidth, image.naturalHeight);
};
const styleSheet = appendStyleSheet();

const defaultOptions = {
    velocityScale: 0.8,
    backgroundImage: getCSSBackgroundImage,
    createBackground: coverElement(pseudoBefore)
};
function fromPartial(options) {
    return Object.assign({}, defaultOptions, options);
}

var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
class ObservableBoundingClientRect {
    constructor(element) {
        const watch = () => {
            this.update(element.getBoundingClientRect());
            scheduler.read(watch);
        };
        watch();
    }
    update(rect) {
        for (let key of ['bottom', 'height', 'left', 'right', 'top', 'width']) {
            this[key] = rect[key];
        }
    }
}
__decorate$2([
    mobx.observable
], ObservableBoundingClientRect.prototype, "bottom", void 0);
__decorate$2([
    mobx.observable
], ObservableBoundingClientRect.prototype, "height", void 0);
__decorate$2([
    mobx.observable
], ObservableBoundingClientRect.prototype, "left", void 0);
__decorate$2([
    mobx.observable
], ObservableBoundingClientRect.prototype, "right", void 0);
__decorate$2([
    mobx.observable
], ObservableBoundingClientRect.prototype, "top", void 0);
__decorate$2([
    mobx.observable
], ObservableBoundingClientRect.prototype, "width", void 0);
__decorate$2([
    mobx.action
], ObservableBoundingClientRect.prototype, "update", null);

var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
__decorate$1([
    mobx.computed
], Viewport.prototype, "height", null);
__decorate$1([
    mobx.computed
], Viewport.prototype, "top", null);

var __decorate$3 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
class ParallaxElement {
    constructor(element, viewport, velocityScale) {
        this.id = ParallaxElement.getNextId();
        this.element = element;
        this.boundingClientRect = new ObservableBoundingClientRect(element);
        this.viewport = viewport;
        this.velocityScale = velocityScale;
        this.element.setAttribute(ATTR_PARALLAX_ELEMENT, this.id);
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
__decorate$3([
    mobx.computed
], ParallaxElement.prototype, "width", null);
__decorate$3([
    mobx.computed
], ParallaxElement.prototype, "height", null);
__decorate$3([
    mobx.computed
], ParallaxElement.prototype, "left", null);
__decorate$3([
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
    const threshold = viewport.height / 2;
    if (Math.abs(elementCenter - viewportCenter) - (viewport.height + element.height) / 2 > threshold) {
        return null;
    }
    const backgroundCenter = element.top + background.height / 2;
    return {
        scale: 1,
        translateX: 0,
        translateY: (elementCenter - viewportCenter) * (element.velocityScale - 1) - (backgroundCenter - elementCenter),
        translateZ: 0
    };
}

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    scheduler.run();
}
class Parallax {
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
            const background = options.createBackground(parallaxElement, image);
            const getTransform = this.useFallback ? fallbackTransform : parallaxTransform;
            mobx.autorun(() => {
                const transform = getTransform(parallaxElement, background);
                if (transform != null)
                    background.updateTransform(transform);
            });
        });
    }
}
Parallax.scheduler = scheduler;
Parallax.getCSSBackgroundImage = getCSSBackgroundImage;
Parallax.pesudoBefore = pseudoBefore;
Parallax.insertImg = insertImg;
Parallax.coverElement = coverElement;
function isChrome() {
    return navigator.userAgent.indexOf('Chrome/') !== -1;
}

window['Parallax'] = Parallax;

}(mobx));
