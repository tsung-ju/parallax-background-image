export function parallaxTransform(element, background) {
    const scale = 1 / element.velocityScale;
    const viewport = element.viewport;
    return {
        scale,
        translateX: element.left * (scale - 1),
        translateY: ((viewport.height - background.height) * scale - (viewport.height - element.height)) / 2,
        translateZ: viewport.perspective * (1 - scale)
    };
}
export function fallbackTransform(element, background) {
    const viewport = element.viewport;
    const viewportCenter = viewport.top + viewport.height / 2;
    const elementCenter = element.top + element.height / 2;
    const backgroundCenter = element.top + background.height / 2;
    return {
        scale: 1,
        translateX: 0,
        translateY: (elementCenter - viewportCenter) * (element.velocityScale - 1) - (backgroundCenter - elementCenter),
        translateZ: 0
    };
}
export function horizontalAlign(element, background, value) {
    return (transform) => Object.assign({}, transform, {
        translateX: transform.translateX - (background.width - element.width) * transform.scale * value
    });
}
