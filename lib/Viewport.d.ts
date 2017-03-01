import { Rect } from './Rect';
export declare class Viewport {
    readonly element: HTMLElement;
    readonly perspective: number;
    readonly rect: Rect;
    constructor(element: HTMLElement, perspective: number);
}
