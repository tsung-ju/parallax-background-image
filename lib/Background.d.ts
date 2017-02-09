import { ParallaxElement } from './ParallaxElement';
import { Transform } from './Transform';
export interface Background {
    readonly width: number;
    readonly height: number;
    updateTransform(transform: Transform): any;
}
export declare abstract class ScaleBackground implements Background {
    background: Background;
    readonly abstract scale: number;
    constructor(background: Background);
    updateTransform(transform: Transform): void;
    readonly height: number;
    readonly width: number;
}
export declare class CoverScaleBackground extends ScaleBackground {
    element: ParallaxElement;
    constructor(background: Background, coveredElement: ParallaxElement);
    readonly scale: number;
    readonly minimalHeight: number;
    readonly minimalWidth: number;
}
export declare type CreateBackground = (el: ParallaxElement, image: HTMLImageElement) => Background;
export declare function coverElement(createBackground: CreateBackground, coveredElement?: ParallaxElement): CreateBackground;
export declare const pseudoBefore: CreateBackground;
export declare const insertImg: CreateBackground;
