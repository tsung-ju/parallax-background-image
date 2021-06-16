export function createTransform(image, element, viewport, options) {
  const { align, velocity, backend } = options;

  const minWidth =
    velocity.x * element.w + Math.abs(1 - velocity.x) * viewport.w;
  const minHeight =
    velocity.y * element.h + Math.abs(1 - velocity.y) * viewport.h;
  let s = Math.max(minWidth / image.w, minHeight / image.h);

  let x = align.x * (minWidth - image.w * s) + 0.5 * (element.w - minWidth);
  let y = align.y * (minHeight - image.h * s) + 0.5 * (element.h - minHeight);
  let z = 0;

  const centerX = 0.5 * (viewport.w - element.w);
  const centerY = 0.5 * (viewport.h - element.h);
  const v = backend === "3d" ? velocity.y : 1;

  x = (x - centerX * (velocity.x - 1)) / v + element.x * (velocity.x / v - 1);
  y = (y - centerY * (velocity.y - 1)) / v + element.y * (velocity.y / v - 1);
  z = 1 - 1 / v;
  s = s / v;

  return { x, y, z, s };
}
