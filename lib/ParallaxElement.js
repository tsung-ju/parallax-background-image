var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { computed } from 'mobx';
import { ATTR_PARALLAX_ELEMENT } from './Constants';
import { ObservableBoundingClientRect } from './ObservableBoundingClientRect';
export class ParallaxElement {
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
__decorate([
    computed
], ParallaxElement.prototype, "width", null);
__decorate([
    computed
], ParallaxElement.prototype, "height", null);
__decorate([
    computed
], ParallaxElement.prototype, "left", null);
