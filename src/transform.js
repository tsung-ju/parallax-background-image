export function coverElement(image, velocity) {
  return function(element, viewport) {
    const minWidth = element.width
    const minHeight =
      viewport.height + velocity * (viewport.height - element.height)
    const widthScale = minWidth / image.naturalWidth
    const heightScale = minHeight / image.naturalHeight
    return {
      x: 0,
      y: 0,
      z: 0,
      s: Math.max(widthScale, heightScale)
    }
  }
}

export function parallax3d(velocity) {
  return function(element, viewport) {
    return {
      x: (element.x - viewport.x) * (1 / velocity - 1),
      y: 0,
      z: 1 - 1 / velocity,
      s: 1 / velocity
    }
  }
}

export function parallax2d(velocity) {
  return function(element, viewport) {
    return {
      x: 0,
      y: (element.y - viewport.y) * (velocity - 1),
      z: 0,
      s: 1
    }
  }
}

export function pipeTransform(...ts) {
  return function(element, viewport) {
    const res = { x: 0, y: 0, z: 0, s: 1 }
    for (let i = 0; i < ts.length; ++i) {
      const { x, y, z, s } = ts[i](element, viewport)
      res.x = x + res.x * s
      res.y = y + res.y * s
      res.z = z + res.z * s
      res.s *= s
    }
    return res
  }
}
