var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { computed } from 'mobx';
import { ATTR_PARALLAX_ELEMENT } from './Constants';
import { appendStyleSheet } from './StyleSheet';
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
        window.requestAnimationFrame(() => {
            this.style.transform = `
                translateX(${transform.translateX}px)
                translateY(${transform.translateY}px)
                translateZ(${transform.translateZ}px)
                scale(${transform.scale}, ${transform.scale})`;
        });
    }
}
export class ScaleBackground {
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
    computed
], ScaleBackground.prototype, "height", null);
__decorate([
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
    computed
], CoverScaleBackground.prototype, "scale", null);
__decorate([
    computed
], CoverScaleBackground.prototype, "minimalHeight", null);
__decorate([
    computed
], CoverScaleBackground.prototype, "minimalWidth", null);
export function coverElement(createBackground, coveredElement = null) {
    return (el, image) => {
        coveredElement = coveredElement || el;
        const background = createBackground(el, image);
        return new CoverScaleBackground(background, coveredElement);
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
    img.height = image.naturalHeight;
    img.width = image.naturalWidth;
    img.src = image.src;
    el.element.insertBefore(img, el.element.firstElementChild);
    return new StyleBackground(img.style, image.naturalWidth, image.naturalHeight);
};
const styleSheet = appendStyleSheet();
