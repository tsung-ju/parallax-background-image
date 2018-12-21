import * as tslib_1 from "tslib";
import { observable, action } from 'mobx';
import { scheduler } from '@ray851107/dom-scheduler';
export class ObservableRect {
    constructor(element) {
        this.left = 0;
        this.top = 0;
        this.width = 0;
        this.height = 0;
        const watch = () => {
            this.update(element.getBoundingClientRect());
            scheduler.read(watch);
        };
        scheduler.read(watch);
    }
    update(rect) {
        this.left = rect.left;
        this.top = rect.top;
        this.width = rect.width;
        this.height = rect.height;
    }
}
tslib_1.__decorate([
    observable
], ObservableRect.prototype, "left", void 0);
tslib_1.__decorate([
    observable
], ObservableRect.prototype, "top", void 0);
tslib_1.__decorate([
    observable
], ObservableRect.prototype, "width", void 0);
tslib_1.__decorate([
    observable
], ObservableRect.prototype, "height", void 0);
tslib_1.__decorate([
    action
], ObservableRect.prototype, "update", null);
