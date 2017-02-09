import * as tslib_1 from "tslib";
import { observable, action } from 'mobx';
import { scheduler } from './Scheduler';
export class ObservableBoundingClientRect {
    constructor(element) {
        const watch = () => {
            this.update(element.getBoundingClientRect());
            scheduler.read(watch);
        };
        watch();
    }
    update(rect) {
        for (let key of ['bottom', 'height', 'left', 'right', 'top', 'width']) {
            this[key] = rect[key];
        }
    }
}
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
