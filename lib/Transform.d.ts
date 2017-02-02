import { ParallaxElement } from './ParallaxElement';
import { Background } from './Background';
export interface Transform {
    readonly scale: number;
    readonly translateX: number;
    readonly translateY: number;
    readonly translateZ: number;
}
export declare function parallaxTransform(element: ParallaxElement, background: Background, velocityScale: number): Transform;
