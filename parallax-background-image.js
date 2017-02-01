(function () {
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

const initialState = {
    scale: 1,
    translateX: 0,
    translateY: 0,
    translateZ: 0
};
class StyleBackground {
    constructor(style) {
        this.state = initialState;
        this.style = style;
        Object.assign(style, {
            position: 'absolute',
            left: '0',
            top: '0',
            transformOrigin: '0 0 0',
            pointerEvents: 'none'
        });
    }
    update(patch) {
        Object.assign(this.state, patch);
        this.style.transform = `
            translateX(${this.state.translateX}px)
            translateY(${this.state.translateY}px)
            translateZ(${this.state.translateZ}px)
            scale(${this.state.scale}, ${this.state.scale})`;
    }
}

const insertImg = (el, image) => {
    const img = document.createElement('img');
    img.height = image.naturalHeight;
    img.width = image.naturalWidth;
    img.src = image.src;
    el.appendChild(img);
    return new StyleBackground(img.style);
};
const styleSheet = appendStyleSheet();

const defaultOptions = {
    velocityScale: 0.8,
    translateX: 0,
    translateY: 0,
    backgroundImage: getCSSBackgroundImage,
    createBackground: insertImg
};
function fromPartial(options) {
    return Object.assign({}, defaultOptions, options);
}

class Viewport {
    constructor(element, perspective) {
        element = toElement(element);
        Object.assign(element.style, {
            overflowY: 'scroll',
            transformStyle: 'flat',
            perspective: perspective + 'px',
            perspectiveOrigin: '0 0'
        });
        this.element = element;
        this.perspective = perspective;
    }
    get height() {
        return this.element.getBoundingClientRect().height;
    }
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
        this.viewport = new Viewport(element, perspective);
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
            element.setAttribute(ATTR_PARALLAX_ELEMENT, getNextElementId());
            const background = options.createBackground(element, image);
            const getParams = () => {
                const { width: elementWidth, height: elementHeight, left } = element.getBoundingClientRect();
                const viewportHeight = this.viewport.height;
                return [elementWidth, elementHeight, left, viewportHeight];
            };
            watchChange(getParams, ([elementWidth, elementHeight, left, viewportHeight]) => {
                const minimalHeight = calcMinimalHeight({ viewportHeight, velocityScale: options.velocityScale, elementHeight });
                const minimalWidth = elementWidth;
                const baseScale = coverScale({
                    height: image.naturalHeight,
                    width: image.naturalWidth,
                    minimalHeight,
                    minimalWidth
                });
                const backgroundHeight = baseScale * image.naturalHeight;
                const scale = 1 / options.velocityScale;
                background.update({
                    translateX: left * (scale - 1),
                    translateY: ((viewportHeight - backgroundHeight) * scale - (viewportHeight - elementHeight)) / 2,
                    translateZ: this.viewport.perspective * (1 - scale),
                    scale: baseScale * scale
                });
            });
        });
    }
}
const getNextElementId = (function () {
    let nextId = 0;
    return () => `${nextId++}`;
}());
function watchChange(getParams, action) {
    let cache = [];
    function watch() {
        const newParams = getParams();
        if (newParams.some((param, i) => cache[i] !== param)) {
            cache = newParams;
            action(newParams);
        }
        window.requestAnimationFrame(watch);
    }
    watch();
}
function calcMinimalHeight({ viewportHeight, elementHeight, velocityScale }) {
    const coverElementTop = velocityScale > 0
        ? elementHeight + (velocityScale - 1) * (viewportHeight + elementHeight)
        : elementHeight + (1 - velocityScale) * (viewportHeight - elementHeight);
    const coverWindowTop = viewportHeight + velocityScale * (viewportHeight - elementHeight);
    return Math.max(coverElementTop, coverWindowTop);
}
function coverScale({ width, height, minimalWidth, minimalHeight }) {
    return Math.max(minimalHeight / height, minimalWidth / width);
}

window['Parallax'] = Parallax;

}());
