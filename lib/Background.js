var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { computed, autorun } from 'mobx';
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
        autorun(() => {
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
    computed
], ScaleBackground.prototype, "height", null);
__decorate([
    computed
], ScaleBackground.prototype, "width", null);
export class CoverElement extends ScaleBackground {
    constructor(background, element, velocityScale) {
        super(background);
        this.element = element;
        this.velocityScale = velocityScale;
    }
    get scale() {
        return Math.max(this.minimalHeight / this.background.height, this.minimalWidth / this.background.width);
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
    computed
], CoverElement.prototype, "scale", null);
__decorate([
    computed
], CoverElement.prototype, "minimalHeight", null);
__decorate([
    computed
], CoverElement.prototype, "minimalWidth", null);
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
