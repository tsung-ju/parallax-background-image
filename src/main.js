import { ParallaxViewport } from "./parallax-viewport";
import { ImageElementRenderer, PseudoElementRenderer } from "./renderer.js";
import { injectStyle } from "./style.js";

injectStyle();

export function createViewport(rootElement, options = {}) {
  return new ParallaxViewport(rootElement, options);
}

export { ImageElementRenderer, PseudoElementRenderer };
