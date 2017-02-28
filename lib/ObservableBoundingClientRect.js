import * as tslib_1 from "tslib";
import { observable, action } from 'mobx';
import { scheduler } from '@ray851107/dom-scheduler';
var ObservableBoundingClientRect = (function () {
    function ObservableBoundingClientRect(element) {
        var _this = this;
        this.bottom = 0;
        this.height = 0;
        this.left = 0;
        this.right = 0;
        this.top = 0;
        this.width = 0;
        var watch = function () {
            _this.update(element.getBoundingClientRect());
            scheduler.read(watch);
        };
        scheduler.read(watch);
    }
    ObservableBoundingClientRect.prototype.update = function (rect) {
        this.bottom = rect.bottom;
        this.height = rect.height;
        this.left = rect.left;
        this.right = rect.right;
        this.top = rect.top;
        this.width = rect.width;
    };
    return ObservableBoundingClientRect;
}());
export { ObservableBoundingClientRect };
tslib_1.__decorate([
    observable
], ObservableBoundingClientRect.prototype, "bottom", void 0);
tslib_1.__decorate([
    observable
], ObservableBoundingClientRect.prototype, "height", void 0);
tslib_1.__decorate([
    observable
], ObservableBoundingClientRect.prototype, "left", void 0);
tslib_1.__decorate([
    observable
], ObservableBoundingClientRect.prototype, "right", void 0);
tslib_1.__decorate([
    observable
], ObservableBoundingClientRect.prototype, "top", void 0);
tslib_1.__decorate([
    observable
], ObservableBoundingClientRect.prototype, "width", void 0);
tslib_1.__decorate([
    action
], ObservableBoundingClientRect.prototype, "update", null);
