export interface Rect {
    readonly left: number;
    readonly top: number;
    readonly width: number;
    readonly height: number;
}
export declare class ObservableRect implements Rect {
    left: number;
    top: number;
    width: number;
    height: number;
    constructor(element: HTMLElement);
    update(rect: ClientRect): void;
}
