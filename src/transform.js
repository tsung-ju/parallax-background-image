export function scale_(bg, s) {
  bg.x *= s
  bg.y *= s
  bg.z *= s
  bg.w *= s
  bg.h *= s
}

export function coverElement(velocity) {
  return function(bg, element, viewport) {
    const minWidth = element.w
    const minHeight = viewport.h + velocity * (viewport.h - element.h)
    const widthScale = minWidth / bg.w
    const heightScale = minHeight / bg.h

    scale_(bg, Math.max(widthScale, heightScale))
  }
}

export function alignX(percentage) {
  percentage = parsePercentage(percentage)
  return function(bg, element, viewport) {
    bg.x = (0.5 - percentage) * (bg.w - element.w)
  }
}

function parsePercentage(str) {
  if (str === 'left') return 0
  if (str === 'center') return 0.5
  if (str === 'right') return 1
  const num = parseFloat(str)
  if (!isNaN(num)) return num / 100
  return 0.5
}

export function parallax3d(velocity) {
  return function(bg, element, viewport) {
    scale_(bg, 1 / velocity)
    bg.z += 1 - 1 / velocity
    bg.x -= element.x * (1 - 1 / velocity)
  }
}

export function parallax2d(velocity) {
  return function(bg, element, viewport) {
    bg.y += element.y * (velocity - 1)
  }
}

export function chainTransforms(transforms) {
  return function(bg, element, viewport) {
    for (let i = 0; i < transforms.length; ++i) {
      transforms[i](bg, element, viewport)
    }
  }
}
