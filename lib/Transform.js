import * as tslib_1 from "tslib";
export function parallaxTransform(element, background) {
    var scale = 1 / element.velocityScale;
    var viewport = element.viewport;
    return {
        scale: scale,
        translateX: element.left * (scale - 1),
        translateY: ((viewport.height - background.height) * scale - (viewport.height - element.height)) / 2,
        translateZ: viewport.perspective * (1 - scale)
    };
}
export function fallbackTransform(element, background) {
    var viewport = element.viewport;
    var viewportCenter = viewport.top + viewport.height / 2;
    var elementCenter = element.top + element.height / 2;
    var backgroundCenter = element.top + background.height / 2;
    return {
        scale: 1,
        translateX: 0,
        translateY: (elementCenter - viewportCenter) * (element.velocityScale - 1) - (backgroundCenter - elementCenter),
        translateZ: 0
    };
}
export function horizontalAlign(element, background, value) {
    return function (transform) { return (tslib_1.__assign({}, transform, { translateX: transform.translateX - (background.width - element.width) * transform.scale * value })); };
}
