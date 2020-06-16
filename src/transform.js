export function createTransform(options) {
  const parallax = options.use3d ? parallax3d : parallax2d

  const coverElement_ = coverElement(options.velocity)
  const alignX_ = alignX(options.alignX)
  const parallax_ = parallax(options.velocity)

  return function transform_(bg, element, viewport) {
    coverElement_(bg, element, viewport)
    alignX_(bg, element, viewport)
    parallax_(bg, element, viewport)
  }
}

function scale_(bg, s) {
  bg.x *= s
  bg.y *= s
  bg.z *= s
  bg.w *= s
  bg.h *= s
}

function coverElement(velocity) {
  return function coverElement_(bg, element, viewport) {
    const minWidth = element.w
    const minHeight = viewport.h + velocity * (viewport.h - element.h)
    const widthScale = minWidth / bg.w
    const heightScale = minHeight / bg.h

    scale_(bg, Math.max(widthScale, heightScale))
  }
}

function alignX(percentage) {
  percentage = parsePercentage(percentage)
  return function alignX_(bg, element, viewport) {
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

function parallax3d(velocity) {
  return function parallax3d_(bg, element, viewport) {
    scale_(bg, 1 / velocity)
    bg.z += 1 - 1 / velocity
    bg.x -= element.x * (1 - 1 / velocity)
  }
}

function parallax2d(velocity) {
  return function parallax2d_(bg, element, viewport) {
    bg.y += element.y * (velocity - 1)
  }
}
