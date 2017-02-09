import { ParallaxElement } from './ParallaxElement';
import { Background } from './Background';
export interface Transform {
    readonly scale: number;
    readonly translateX: number;
    readonly translateY: number;
    readonly translateZ: number;
}
export declare function parallaxTransform(element: ParallaxElement, background: Background): Transform;
export declare function fallbackTransform(element: ParallaxElement, background: Background): Transform;
