import { getCSSBackgroundImage } from './BackgroundImage';
import { insertImg } from './Background';
export const defaultOptions = {
    velocityScale: 0.8,
    translateX: 0,
    translateY: 0,
    backgroundImage: getCSSBackgroundImage,
    createBackground: insertImg
};
export function fromPartial(options) {
    return Object.assign({}, defaultOptions, options);
}
