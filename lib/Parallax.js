import * as tslib_1 from "tslib";
import { autorun } from 'mobx';
import { ATTR_PARALLAX_ELEMENT } from './Constants';
import { toElement, toElementArray } from './ToElement';
import { getCSSBackgroundImage, loadBackgroundImage } from './BackgroundImage';
import { fromPartial } from './Options';
import { prependStyleSheet } from './StyleSheet';
import { Viewport } from './Viewport';
import { ParallaxElement } from './ParallaxElement';
import { coverElement, pseudoBefore, insertImg } from './Background';
import { parallaxTransform, fallbackTransform, horizontalAlign } from './Transform';
initialize();
function initialize() {
    var styleSheet = prependStyleSheet();
    styleSheet.insertRule("\n        [" + ATTR_PARALLAX_ELEMENT + "] > * {\n            position: relative;\n        }\n    ", 0);
    styleSheet.insertRule("\n        [" + ATTR_PARALLAX_ELEMENT + "] {\n            position: relative;\n            overflow: hidden;\n        }\n    ", 0);
}
var Parallax = (function () {
    function Parallax(element, useFallback, perspective) {
        if (useFallback === void 0) { useFallback = !isChrome(); }
        if (perspective === void 0) { perspective = 1000; }
        if (useFallback) {
            perspective = Infinity;
        }
        this.useFallback = useFallback;
        this.viewport = new Viewport(toElement(element), perspective);
    }
    Parallax.prototype.add = function (elements, partial) {
        var _this = this;
        if (partial === void 0) { partial = {}; }
        var options = fromPartial(partial);
        if (options.velocityScale < 0)
            throw new RangeError('velocityScale must be positive');
        return toElementArray(elements, this.viewport.element)
            .filter(function (element) { return !element.hasAttribute(ATTR_PARALLAX_ELEMENT); })
            .map(function (element) { return _this.addElement(element, options); });
    };
    Parallax.prototype.addElement = function (element, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var image, parallaxElement, background, getTransform, align;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, loadBackgroundImage(element, options.backgroundImage)];
                    case 1:
                        image = _a.sent();
                        parallaxElement = new ParallaxElement(element, this.viewport, options.velocityScale);
                        removeBackground(element);
                        background = options.createBackground(parallaxElement, image);
                        getTransform = this.useFallback ? fallbackTransform : parallaxTransform;
                        align = horizontalAlign(parallaxElement, background, options.horizontalAlign);
                        autorun(function () {
                            var transform = getTransform(parallaxElement, background);
                            background.updateTransform(align(transform));
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    return Parallax;
}());
export { Parallax };
Parallax.getCSSBackgroundImage = getCSSBackgroundImage;
Parallax.pesudoBefore = pseudoBefore;
Parallax.insertImg = insertImg;
Parallax.coverElement = coverElement;
function isChrome() {
    var userAgent = navigator.userAgent;
    return userAgent.indexOf('Chrome/') !== -1 && userAgent.indexOf('Edge/') === -1;
}
function removeBackground(element) {
    element.style.setProperty('background', 'none', 'important');
    element.style.setProperty('background-image', 'none', 'important');
}
