import * as tslib_1 from "tslib";
import { computed } from 'mobx';
import { ATTR_PARALLAX_ELEMENT } from './Constants';
import { appendStyleSheet } from './StyleSheet';
import { scheduler } from '@ray851107/dom-scheduler';
var StyleBackground = (function () {
    function StyleBackground(style, width, height) {
        this.style = style;
        this.width = width;
        this.height = height;
        scheduler.write(function () {
            style.position = 'absolute';
            style.left = '0';
            style.top = '0';
            style.transformOrigin = '0 0 0';
            style.pointerEvents = 'none';
        });
    }
    StyleBackground.prototype.updateTransform = function (transform) {
        var _this = this;
        var style = "\n            translateX(" + transform.translateX + "px)\n            translateY(" + transform.translateY + "px)\n            translateZ(" + transform.translateZ + "px)\n            scale(" + transform.scale + ", " + transform.scale + ")";
        scheduler.write(function () { _this.style.transform = style; });
    };
    return StyleBackground;
}());
var ScaleBackground = (function () {
    function ScaleBackground(background) {
        this.background = background;
    }
    ScaleBackground.prototype.updateTransform = function (transform) {
        this.background.updateTransform(tslib_1.__assign({}, transform, { scale: transform.scale * this.scale }));
    };
    Object.defineProperty(ScaleBackground.prototype, "height", {
        get: function () {
            return this.background.height * this.scale;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScaleBackground.prototype, "width", {
        get: function () {
            return this.background.width * this.scale;
        },
        enumerable: true,
        configurable: true
    });
    return ScaleBackground;
}());
export { ScaleBackground };
tslib_1.__decorate([
    computed
], ScaleBackground.prototype, "height", null);
tslib_1.__decorate([
    computed
], ScaleBackground.prototype, "width", null);
var CoverScaleBackground = (function (_super) {
    tslib_1.__extends(CoverScaleBackground, _super);
    function CoverScaleBackground(background, coveredElement) {
        var _this = _super.call(this, background) || this;
        _this.element = coveredElement;
        return _this;
    }
    Object.defineProperty(CoverScaleBackground.prototype, "scale", {
        get: function () {
            return Math.max(this.minimalHeight / this.background.height, this.minimalWidth / this.background.width);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CoverScaleBackground.prototype, "minimalHeight", {
        get: function () {
            var viewportHeight = this.element.viewport.height;
            var _a = this.element, elementHeight = _a.height, velocityScale = _a.velocityScale;
            var coverWindowTop = viewportHeight + velocityScale * (viewportHeight - elementHeight);
            return coverWindowTop;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CoverScaleBackground.prototype, "minimalWidth", {
        get: function () {
            return this.element.width;
        },
        enumerable: true,
        configurable: true
    });
    return CoverScaleBackground;
}(ScaleBackground));
export { CoverScaleBackground };
tslib_1.__decorate([
    computed
], CoverScaleBackground.prototype, "scale", null);
tslib_1.__decorate([
    computed
], CoverScaleBackground.prototype, "minimalHeight", null);
tslib_1.__decorate([
    computed
], CoverScaleBackground.prototype, "minimalWidth", null);
export function coverElement(createBackground, coveredElement) {
    if (coveredElement === void 0) { coveredElement = null; }
    return function (el, image) {
        var background = createBackground(el, image);
        return new CoverScaleBackground(background, coveredElement || el);
    };
}
export var pseudoBefore = function (el, image) {
    var rule = "[" + ATTR_PARALLAX_ELEMENT + "=\"" + el.id + "\"]::before {\n        content: '';\n        width: " + image.naturalWidth + "px;\n        height: " + image.naturalHeight + "px;\n        background-image: url(" + image.src + ");\n        background-size: 100% 100%;\n    }";
    var index = styleSheet.insertRule(rule, 0);
    var style = styleSheet.cssRules[index].style;
    return new StyleBackground(style, image.naturalWidth, image.naturalHeight);
};
export var insertImg = function (el, image) {
    var img = document.createElement('img');
    scheduler.write(function () {
        img.height = image.naturalHeight;
        img.width = image.naturalWidth;
        img.src = image.src;
        el.element.insertBefore(img, el.element.firstElementChild);
    });
    return new StyleBackground(img.style, image.naturalWidth, image.naturalHeight);
};
var styleSheet = appendStyleSheet();
