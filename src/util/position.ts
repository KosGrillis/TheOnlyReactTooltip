import { State as PositionState } from '..'

const calculateTop = (
  ttRect: DOMRect,
  hoverRect: DOMRect,
  hoverRectComputedStyles: CSSStyleDeclaration,
): PositionState["transform"] => {

  let marginOffset = 0
  if (hoverRectComputedStyles.marginTop) {
    marginOffset = parseFloat(hoverRectComputedStyles.marginTop)
  }

  const top = hoverRect.top + window.pageYOffset - ttRect.height + marginOffset
  const left = hoverRect.left - ttRect.width / 2 + hoverRect.width / 2 + window.pageXOffset
  return { top, left }
}

const calculateBottom = (
  ttRect: DOMRect,
  hoverRect: DOMRect,
  hoverRectComputedStyles: CSSStyleDeclaration,
): PositionState["transform"] => {

  let marginOffset = 0
  if (hoverRectComputedStyles.marginBottom) {
    marginOffset = parseFloat(hoverRectComputedStyles.marginBottom)
  }

  const top = hoverRect.top + hoverRect.height + window.pageYOffset - marginOffset
  const left = hoverRect.left - ttRect.width / 2 + hoverRect.width / 2 + window.pageXOffset
  return { top, left }
}

const calculateRight = (
  ttRect: DOMRect,
  hoverRect: DOMRect,
  hoverRectComputedStyles: CSSStyleDeclaration,
): PositionState["transform"] => {

  let marginOffset = 0
  if (hoverRectComputedStyles.marginRight) {
    marginOffset = parseFloat(hoverRectComputedStyles.marginRight)
  }

  const top = hoverRect.top - ttRect.height / 2 + hoverRect.height / 2 + window.pageYOffset
  const left = hoverRect.left + hoverRect.width - marginOffset + window.pageXOffset
  return { top, left }
}

const calculateLeft = (
  ttRect: DOMRect,
  hoverRect: DOMRect,
  hoverRectComputedStyles: CSSStyleDeclaration,
): PositionState["transform"] => {

  let marginOffset = 0
  if (hoverRectComputedStyles.marginLeft) {
    marginOffset = parseFloat(hoverRectComputedStyles.marginLeft)
  }

  // FIXME: Why does only the left position need the width of the arrow
  // hardcoded in?
  const top = hoverRect.top - ttRect.height / 2 + hoverRect.height / 2 + window.pageYOffset
  const left = hoverRect.left - ttRect.width + marginOffset + window.pageXOffset - 5 // 5 for arrow width
  return { top, left }
}

const calculatePosition = {
  top: calculateTop,
  bottom: calculateBottom,
  left: calculateLeft,
  right: calculateRight,
}

export default calculatePosition

