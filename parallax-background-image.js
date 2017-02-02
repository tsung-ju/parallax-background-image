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

function loadBackgroundImage(el, getImage) {
    if (typeof getImage === 'string') {
        return loadImage(getImage);
    }
    return loadImage(getImage(el));
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
        mobx.autorun(() => {
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
class CoverElement extends ScaleBackground {
    constructor(background, element, velocityScale) {
        super(background);
        this.element = element;
        this.velocityScale = velocityScale;
    }
    get scale() {
        return Math.max(this.minimalHeight / this.element.height, this.minimalWidth / this.element.width);
    }
    get minimalHeight() {
        const { height: viewportHeight } = this.element.viewport;
        const { height: elementHeight } = this.element;
        const coverElementTop = this.velocityScale > 1
            ? elementHeight + (this.velocityScale - 1) * (viewportHeight + elementHeight)
            : elementHeight + (1 - this.velocityScale) * (viewportHeight - elementHeight);
        const coverWindowTop = viewportHeight + this.velocityScale * (viewportHeight - elementHeight);
        return Math.max(coverElementTop, coverWindowTop);
    }
    get minimalWidth() {
        return this.element.width;
    }
}
__decorate([
    mobx.computed
], CoverElement.prototype, "scale", null);
__decorate([
    mobx.computed
], CoverElement.prototype, "minimalHeight", null);
__decorate([
    mobx.computed
], CoverElement.prototype, "minimalWidth", null);
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

const styleSheet = appendStyleSheet();

const defaultOptions = {
    velocityScale: 0.8,
    translateX: 0,
    translateY: 0,
    backgroundImage: getCSSBackgroundImage,
    createBackground(el, image, velocityScale) {
        return new CoverElement(pseudoBefore(el, image, velocityScale), el, velocityScale);
    }
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
            window.requestAnimationFrame(watch);
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
}
__decorate$1([
    mobx.computed
], Viewport.prototype, "height", null);

var __decorate$3 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
class ParallaxElement {
    constructor(element, viewport) {
        this.id = ParallaxElement.getNextId();
        this.element = element;
        this.boundingClientRect = new ObservableBoundingClientRect(element);
        this.viewport = viewport;
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

function parallaxTransform(element, background, velocityScale) {
    const scale = 1 / velocityScale;
    const viewport = element.viewport;
    return {
        scale,
        translateX: element.left * (scale - 1),
        translateY: ((viewport.height - background.height) * scale - (viewport.height - element.height)) / 2,
        translateZ: viewport.perspective * (1 - scale)
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
}
class Parallax {
    constructor(element, perspective = 1000) {
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
            const parallaxElement = new ParallaxElement(element, this.viewport);
            const background = options.createBackground(parallaxElement, image, options.velocityScale);
            mobx.autorun(() => {
                background.updateTransform(parallaxTransform(parallaxElement, background, options.velocityScale));
            });
        });
    }
}

window['Parallax'] = Parallax;

}(mobx));
