import { prependStyleSheet } from "./style-sheet.js";

export const CLASS_PARALLAX_VIEWPORT = "parallax-background-image-viewport";
export const CLASS_PARALLAX_VIEWPORT_3D =
  "parallax-background-image-viewport-3d";
export const CLASS_PARALLAX_ELEMENT = "parallax-background-image-element";

export function injectStyle() {
  prependStyleSheet(STYLE);
}

const STYLE = `
.${CLASS_PARALLAX_ELEMENT} {
  position: relative;
  overflow: hidden !important;
  background: none !important;
  background-image: none !important;
}

.${CLASS_PARALLAX_ELEMENT} > * {
  position: relative;
}

.${CLASS_PARALLAX_VIEWPORT} {
  overflow-x: hidden !important;
  overflow-y: scroll !important;
  -webkit-overflow-scrolling: touch;
}

.${CLASS_PARALLAX_VIEWPORT_3D} {
  perspective: 1px !important;
  perspective-origin: center center !important;
}`;
