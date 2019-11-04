import { State as PositionState } from '..'

const calculateTop = (
  ttRect: DOMRect,
  hoverRect: DOMRect,
  hoverRectComputedStyles: CSSStyleDeclaration,
): PositionState["transform"] => {
  let x = '0'
  let y = '0'

  let marginTop = 0
  if (hoverRectComputedStyles.marginTop) {
    marginTop = parseFloat(hoverRectComputedStyles.marginTop)
  }

  y = `-${hoverRect.height + ttRect.height - marginTop}`

  if (ttRect.width > hoverRect.width) {
    x = `-${(ttRect.width - hoverRect.width) / 2}`
  } else {
    x = `${(hoverRect.width - ttRect.width) / 2}`
  }

  return { x, y }
}

const calculateBottom = (
  ttRect: DOMRect,
  hoverRect: DOMRect,
  hoverRectComputedStyles: CSSStyleDeclaration,
): PositionState["transform"] => {
  let x = '0'
  let y = '0'

  let marginBottom = 0
  if (hoverRectComputedStyles.marginBottom) {
    marginBottom = parseFloat(hoverRectComputedStyles.marginBottom)
  }

  if (ttRect.width > hoverRect.width) {
    x = `-${(ttRect.width - hoverRect.width) / 2}`
    y = `-${marginBottom}`
  } else {
    x = `${(hoverRect.width - ttRect.width) / 2}`
    y = `-${marginBottom}`
  }

  return { x, y }
}

const calculateRight = (
  ttRect: DOMRect,
  hoverRect: DOMRect,
  hoverRectComputedStyles: CSSStyleDeclaration,
): PositionState["transform"] => {

  let marginRight = 0
  if (hoverRectComputedStyles.marginRight) {
    marginRight = parseFloat(hoverRectComputedStyles.marginRight)
  }

  const x = `${hoverRect.width - marginRight}`
  const y = `-${(hoverRect.height / 2 + ttRect.height / 2)}`
  return { x, y }
}

const calculateLeft = (
  ttRect: DOMRect,
  hoverRect: DOMRect,
  hoverRectComputedStyles: CSSStyleDeclaration,
): PositionState["transform"] => {

  let marginLeft = 0
  if (hoverRectComputedStyles.marginLeft) {
    marginLeft = parseFloat(hoverRectComputedStyles.marginLeft)
  }

  // FIXME: Why does only the left position need the width of the arrow
  // hardcoded in?
  const x = `-${ttRect.width - marginLeft + 5}`
  const y = `-${(hoverRect.height / 2 + ttRect.height / 2)}`
  return { x, y }
}

const calculatePosition = {
  top: calculateTop,
  bottom: calculateBottom,
  left: calculateLeft,
  right: calculateRight,
}

export default calculatePosition

