import { USE_3D } from "./config.js";

export function transform_(bg, element, viewport, options) {
  const { alignX, velocity } = options;

  const minWidth = element.w;
  const minHeight = velocity * element.h + Math.abs(1 - velocity) * viewport.h;
  const coverScale = Math.max(minHeight / bg.h, minWidth / bg.w);
  bg.w *= coverScale;
  bg.h *= coverScale;

  bg.x = alignX * (element.w - bg.w);
  bg.y = element.h / 2 - bg.h / 2;
  bg.z = 0;

  const centerY = viewport.h / 2 - element.h / 2;
  if (USE_3D) {
    const z = 1 - 1 / velocity;
    bg.x -= element.x * z;
    bg.y += centerY * z;
    bg.z = z;
    bg.w /= velocity;
    bg.h /= velocity;
  } else {
    bg.y += (element.y - centerY) * (velocity - 1);
  }
}
