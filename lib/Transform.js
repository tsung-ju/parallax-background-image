var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { computed } from 'mobx';
export class ParallaxTransform {
    constructor(element, background, velocityScale) {
        this.element = element;
        this.background = background;
        this.velocityScale = velocityScale;
    }
    get scale() {
        return 1 / this.velocityScale;
    }
    get translateX() {
        return this.element.left * (this.scale - 1);
    }
    get translateY() {
        const element = this.element;
        const viewport = this.element.viewport;
        return ((viewport.height - this.background.height) * this.scale - (viewport.height - element.height)) / 2;
    }
    get translateZ() {
        return this.element.viewport.perspective * (1 - this.scale);
    }
}
__decorate([
    computed
], ParallaxTransform.prototype, "scale", null);
__decorate([
    computed
], ParallaxTransform.prototype, "translateX", null);
__decorate([
    computed
], ParallaxTransform.prototype, "translateY", null);
__decorate([
    computed
], ParallaxTransform.prototype, "translateZ", null);
export function mapTransform(transform, patcher) {
    return new MapTransform(transform, patcher);
}
class MapTransform {
    constructor(input, patcher) {
        this.input = input;
        this.patcher = patcher;
    }
    get patched() {
        return Object.assign({}, this.input, this.patcher(this.input));
    }
    get scale() {
        return this.patched.scale;
    }
    get translateX() {
        return this.patched.translateX;
    }
    get translateY() {
        return this.patched.translateY;
    }
    get translateZ() {
        return this.patched.translateZ;
    }
}
__decorate([
    computed
], MapTransform.prototype, "patched", null);
__decorate([
    computed
], MapTransform.prototype, "scale", null);
__decorate([
    computed
], MapTransform.prototype, "translateX", null);
__decorate([
    computed
], MapTransform.prototype, "translateY", null);
__decorate([
    computed
], MapTransform.prototype, "translateZ", null);
