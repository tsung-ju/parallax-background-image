import * as tslib_1 from "tslib";
import { autorun } from 'mobx';
import { ATTR_PARALLAX_ELEMENT } from './Constants';
import { toElement, toElementArray } from './ToElement';
import { getCSSBackgroundImage, loadBackgroundImage } from './BackgroundImage';
import { fromPartial } from './Options';
import { prependStyleSheet } from './StyleSheet';
import { Viewport } from './Viewport';
import { ParallaxElement } from './ParallaxElement';
import { coverElement, pseudoBefore, insertImg } from './Background';
import { parallaxTransform, fallbackTransform, horizontalAlign } from './Transform';
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
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const image = yield loadBackgroundImage(element, options.backgroundImage);
            const parallaxElement = new ParallaxElement(element, this.viewport, options.velocityScale);
            removeBackground(element);
            const background = options.createBackground(parallaxElement, image);
            const getTransform = this.useFallback ? fallbackTransform : parallaxTransform;
            const align = horizontalAlign(parallaxElement, background, options.horizontalAlign);
            autorun(() => {
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
    return userAgent.includes('Chrome/') && !userAgent.includes('Edge/');
}
function removeBackground(element) {
    element.style.setProperty('background', 'none', 'important');
    element.style.setProperty('background-image', 'none', 'important');
}
