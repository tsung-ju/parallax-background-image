import * as tslib_1 from "tslib";
import { getCSSBackgroundImage } from './BackgroundImage';
import { insertImg, coverElement } from './Background';
export var defaultOptions = {
    velocityScale: 0.8,
    horizontalAlign: 0.5,
    backgroundImage: getCSSBackgroundImage,
    createBackground: coverElement(insertImg)
};
export function fromPartial(options) {
    return tslib_1.__assign({}, defaultOptions, options);
}
