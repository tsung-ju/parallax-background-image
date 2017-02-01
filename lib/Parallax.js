var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ATTR_PARALLAX_ELEMENT } from './Constants';
import { toElementArray } from './ToElement';
import { loadBackgroundImage } from './BackgroundImage';
import { fromPartial } from './Options';
import { prependStyleSheet } from './StyleSheet';
import { Viewport } from './Viewport';
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
export class Parallax {
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
