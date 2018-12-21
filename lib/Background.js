import * as tslib_1 from "tslib";
import { computed } from 'mobx';
import { ATTR_PARALLAX_ELEMENT } from './Constants';
import { appendStyleSheet } from './StyleSheet';
import { scheduler } from '@ray851107/dom-scheduler';
class StyleBackground {
    constructor(style, width, height) {
        this.style = style;
        this.width = width;
        this.height = height;
        scheduler.write(() => {
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
        scheduler.write(() => { this.style.transform = style; });
    }
}
export class ScaleBackground {
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
tslib_1.__decorate([
    computed
], ScaleBackground.prototype, "height", null);
tslib_1.__decorate([
    computed
], ScaleBackground.prototype, "width", null);
export class CoverScaleBackground extends ScaleBackground {
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
tslib_1.__decorate([
    computed
], CoverScaleBackground.prototype, "scale", null);
tslib_1.__decorate([
    computed
], CoverScaleBackground.prototype, "minimalHeight", null);
tslib_1.__decorate([
    computed
], CoverScaleBackground.prototype, "minimalWidth", null);
export function coverElement(createBackground, coveredElement = null) {
    return (el, image) => {
        const background = createBackground(el, image);
        return new CoverScaleBackground(background, coveredElement || el);
    };
}
export const pseudoBefore = (el, image) => {
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
export const insertImg = (el, image) => {
    const img = document.createElement('img');
    scheduler.write(() => {
        img.height = image.naturalHeight;
        img.width = image.naturalWidth;
        img.src = image.src;
        el.element.insertBefore(img, el.element.firstElementChild);
    });
    return new StyleBackground(img.style, image.naturalWidth, image.naturalHeight);
};
const styleSheet = appendStyleSheet();
