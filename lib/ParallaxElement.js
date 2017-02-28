import * as tslib_1 from "tslib";
import { computed } from 'mobx';
import { ATTR_PARALLAX_ELEMENT } from './Constants';
import { ObservableBoundingClientRect } from './ObservableBoundingClientRect';
import { scheduler } from '@ray851107/dom-scheduler';
var ParallaxElement = (function () {
    function ParallaxElement(element, viewport, velocityScale) {
        var _this = this;
        this.id = ParallaxElement.getNextId();
        this.element = element;
        this.boundingClientRect = new ObservableBoundingClientRect(element);
        this.viewport = viewport;
        this.velocityScale = velocityScale;
        scheduler.write(function () {
            _this.element.setAttribute(ATTR_PARALLAX_ELEMENT, _this.id);
        });
    }
    Object.defineProperty(ParallaxElement.prototype, "width", {
        get: function () {
            return this.boundingClientRect.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParallaxElement.prototype, "height", {
        get: function () {
            return this.boundingClientRect.height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParallaxElement.prototype, "left", {
        get: function () {
            return this.boundingClientRect.left;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParallaxElement.prototype, "top", {
        get: function () {
            return this.boundingClientRect.top;
        },
        enumerable: true,
        configurable: true
    });
    ParallaxElement.getNextId = function () {
        return "" + ParallaxElement.nextId++;
    };
    return ParallaxElement;
}());
export { ParallaxElement };
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
