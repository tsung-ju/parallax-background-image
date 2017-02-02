var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { action, computed, observable, autorun } from 'mobx';
import { ATTR_PARALLAX_ELEMENT } from './Constants';
import { appendStyleSheet } from './StyleSheet';
export const initialState = {
    scale: 1,
    translateX: 0,
    translateY: 0,
    translateZ: 0
};
class StyleBackground {
    constructor(style, width, height) {
        this.state = observable(initialState);
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
        autorun(() => {
            this.style.transform = `
                translateX(${this.state.translateX}px)
                translateY(${this.state.translateY}px)
                translateZ(${this.state.translateZ}px)
                scale(${this.state.scale}, ${this.state.scale})`;
        });
    }
    update(patch) {
        Object.assign(this.state, patch);
    }
}
__decorate([
    observable
], StyleBackground.prototype, "state", void 0);
__decorate([
    action
], StyleBackground.prototype, "update", null);
class ScaleBackground {
    constructor(background) {
        this.background = background;
    }
    update(patch) {
        if (patch.scale != null) {
            patch.scale *= this.scale;
        }
        this.background.update(patch);
    }
    get height() {
        return this.background.height * this.scale;
    }
    get width() {
        return this.background.width * this.scale;
    }
}
__decorate([
    action
], ScaleBackground.prototype, "update", null);
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
        return Math.max(this.minimalHeight / this.element.height, this.minimalWidth / this.element.width);
    }
    get minimalHeight() {
        const { height: viewportHeight } = this.element.viewport;
        const { height: elementHeight } = this.element;
        const coverElementTop = this.velocityScale > 0
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
export class Translate {
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
