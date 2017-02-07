export function parallaxTransform(element, background, velocityScale) {
    const scale = 1 / velocityScale;
    const viewport = element.viewport;
    return {
        scale,
        translateX: element.left * (scale - 1),
        translateY: ((viewport.height - background.height) * scale - (viewport.height - element.height)) / 2,
        translateZ: viewport.perspective * (1 - scale)
    };
}
export function fallbackTransform(element, background, velocityScale) {
    const viewport = element.viewport;
    const viewportCenter = viewport.top + viewport.height / 2;
    const elementCenter = element.top + element.height / 2;
    const backgroundCenter = element.top + background.height / 2;
    return {
        scale: 1,
        translateX: 0,
        translateY: (elementCenter - viewportCenter) * (velocityScale - 1) - (backgroundCenter - elementCenter),
        translateZ: 0
    };
}
