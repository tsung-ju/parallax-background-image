import { ToBackgroundImage } from './BackgroundImage';
import { CreateBackground } from './Background';
export interface Options {
    velocityScale: number;
    backgroundImage: ToBackgroundImage;
    createBackground: CreateBackground;
}
export declare const defaultOptions: Options;
export declare function fromPartial(options: Partial<Options>): Options;
