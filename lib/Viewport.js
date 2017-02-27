import * as tslib_1 from "tslib";
import { computed } from 'mobx';
import { ObservableBoundingClientRect } from './ObservableBoundingClientRect';
export class Viewport {
    constructor(element, perspective) {
        Object.assign(element.style, {
            overflowY: 'scroll',
            webkitOverflowScrolling: 'touch',
            transformStyle: 'flat',
        });
        if (perspective !== Infinity) {
            Object.assign(element.style, {
                perspective: perspective + 'px',
                perspectiveOrigin: '0 0'
            });
        }
        this.element = element;
        this.perspective = perspective;
        this.boundingClientRect = new ObservableBoundingClientRect(element);
    }
    get height() {
        return this.boundingClientRect.height;
    }
    get top() {
        return this.boundingClientRect.top;
    }
}
tslib_1.__decorate([
    computed
], Viewport.prototype, "height", null);
tslib_1.__decorate([
    computed
], Viewport.prototype, "top", null);
