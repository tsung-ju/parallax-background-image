import * as tslib_1 from "tslib";
import { computed } from 'mobx';
import { ObservableBoundingClientRect } from './ObservableBoundingClientRect';
var Viewport = (function () {
    function Viewport(element, perspective) {
        element.style.overflowY = 'scroll';
        element.style['webkitOverflowScrolling'] = 'touch';
        element.style.transformStyle = 'flat';
        if (perspective !== Infinity) {
            element.style.perspective = perspective + 'px';
            element.style.perspectiveOrigin = '0 0';
        }
        this.element = element;
        this.perspective = perspective;
        this.boundingClientRect = new ObservableBoundingClientRect(element);
    }
    Object.defineProperty(Viewport.prototype, "height", {
        get: function () {
            return this.boundingClientRect.height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Viewport.prototype, "top", {
        get: function () {
            return this.boundingClientRect.top;
        },
        enumerable: true,
        configurable: true
    });
    return Viewport;
}());
export { Viewport };
tslib_1.__decorate([
    computed
], Viewport.prototype, "height", null);
tslib_1.__decorate([
    computed
], Viewport.prototype, "top", null);
