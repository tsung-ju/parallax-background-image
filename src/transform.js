export function createTransform(image, element, viewport, options) {
  const { alignX, velocity, backend } = options;

  const minWidth = element.w;
  const minHeight = velocity * element.h + Math.abs(1 - velocity) * viewport.h;
  let s = Math.max(minHeight / image.h, minWidth / image.w);

  let x = alignX * (element.w - image.w * s);
  let y = element.h / 2 - (image.h * s) / 2;
  let z = 0;

  const centerY = viewport.h / 2 - element.h / 2;
  if (backend === "3d") {
    z = 1 - 1 / velocity;
    x -= element.x * z;
    y += centerY * z;
    s /= velocity;
  } else {
    y += (element.y - centerY) * (velocity - 1);
  }

  return { x, y, z, s };
}
