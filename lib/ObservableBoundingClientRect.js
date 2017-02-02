var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { observable, transaction } from 'mobx';
export class ObservableBoundingClientRect {
    constructor(element) {
        const watch = () => {
            const rect = element.getBoundingClientRect();
            transaction(() => {
                for (let key of ['bottom', 'height', 'left', 'right', 'top', 'width']) {
                    this[key] = rect[key];
                }
            });
            window.requestAnimationFrame(watch);
        };
        watch();
    }
}
__decorate([
    observable
], ObservableBoundingClientRect.prototype, "bottom", void 0);
__decorate([
    observable
], ObservableBoundingClientRect.prototype, "height", void 0);
__decorate([
    observable
], ObservableBoundingClientRect.prototype, "left", void 0);
__decorate([
    observable
], ObservableBoundingClientRect.prototype, "right", void 0);
__decorate([
    observable
], ObservableBoundingClientRect.prototype, "top", void 0);
__decorate([
    observable
], ObservableBoundingClientRect.prototype, "width", void 0);
