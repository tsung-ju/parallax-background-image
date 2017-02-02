import { observable } from 'mobx';
export function observeBoundingClientRect(element) {
    const boundingClientRect = observable(Object.assign({}, element.getBoundingClientRect()));
    function watch() {
        Object.assign(boundingClientRect, element.getBoundingClientRect());
        window.requestAnimationFrame(watch);
    }
    watch();
    return boundingClientRect;
}
