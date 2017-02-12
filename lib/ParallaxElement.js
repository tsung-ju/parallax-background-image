import * as tslib_1 from "tslib";
import { computed } from 'mobx';
import { ATTR_PARALLAX_ELEMENT } from './Constants';
import { ObservableBoundingClientRect } from './ObservableBoundingClientRect';
import { scheduler } from 'dom-scheduler';
export class ParallaxElement {
    constructor(element, viewport, velocityScale) {
        this.id = ParallaxElement.getNextId();
        this.element = element;
        this.boundingClientRect = new ObservableBoundingClientRect(element);
        this.viewport = viewport;
        this.velocityScale = velocityScale;
        scheduler.write(() => {
            this.element.setAttribute(ATTR_PARALLAX_ELEMENT, this.id);
        });
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
    get top() {
        return this.boundingClientRect.top;
    }
    static getNextId() {
        return `${ParallaxElement.nextId++}`;
    }
}
ParallaxElement.nextId = 0;
tslib_1.__decorate([
    computed
], ParallaxElement.prototype, "width", null);
tslib_1.__decorate([
    computed
], ParallaxElement.prototype, "height", null);
tslib_1.__decorate([
    computed
], ParallaxElement.prototype, "left", null);
tslib_1.__decorate([
    computed
], ParallaxElement.prototype, "top", null);
