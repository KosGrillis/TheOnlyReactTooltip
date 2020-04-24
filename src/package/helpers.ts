import { TooltipState } from './types'

export const isOrHasFixedParent = (target: React.BaseSyntheticEvent['currentTarget']) => {
  let currTarget = target

  do {
    if (getComputedStyle(target).position === 'fixed') return target.getBoundingClientRect()
  } while (currTarget = currTarget.offsetParent)

  return undefined
}

const calculateFixedParentOffset = (hoverRectFixedParentRect: DOMRect): TooltipState["transform"] => {
  return {
    top: hoverRectFixedParentRect.top,
    left: hoverRectFixedParentRect.left,
  }
}

const calculateTop = (
  ttRect: DOMRect,
  hoverRect: DOMRect,
  hoverRectComputedStyles: CSSStyleDeclaration,
  hoverRectFixedParentRect?: DOMRect,
): TooltipState["transform"] => {

  let marginOffset = 0
  if (hoverRectComputedStyles.marginTop) {
    marginOffset = parseFloat(hoverRectComputedStyles.marginTop)
  }

  let fixedParentOffset = { top: 0, left: 0 }
  if (hoverRectFixedParentRect) fixedParentOffset = calculateFixedParentOffset(hoverRectFixedParentRect)

  const top = hoverRect.top + window.pageYOffset - ttRect.height + marginOffset - fixedParentOffset.top
  const left = hoverRect.left - ttRect.width / 2 + hoverRect.width / 2 + window.pageXOffset - fixedParentOffset.left
  return { top, left }
}

const calculateBottom = (
  ttRect: DOMRect,
  hoverRect: DOMRect,
  hoverRectComputedStyles: CSSStyleDeclaration,
  hoverRectFixedParentRect?: DOMRect,
): TooltipState["transform"] => {

  let marginOffset = 0
  if (hoverRectComputedStyles.marginBottom) {
    marginOffset = parseFloat(hoverRectComputedStyles.marginBottom)
  }

  let fixedParentOffset = { top: 0, left: 0 }
  if (hoverRectFixedParentRect) fixedParentOffset = calculateFixedParentOffset(hoverRectFixedParentRect)

  const top = hoverRect.top + hoverRect.height + window.pageYOffset - marginOffset - fixedParentOffset.top
  const left = hoverRect.left - ttRect.width / 2 + hoverRect.width / 2 + window.pageXOffset - fixedParentOffset.left
  return { top, left }
}

const calculateRight = (
  ttRect: DOMRect,
  hoverRect: DOMRect,
  hoverRectComputedStyles: CSSStyleDeclaration,
  hoverRectFixedParentRect?: DOMRect,
): TooltipState["transform"] => {

  let marginOffset = 0
  if (hoverRectComputedStyles.marginRight) {
    marginOffset = parseFloat(hoverRectComputedStyles.marginRight)
  }

  let fixedParentOffset = { top: 0, left: 0 }
  if (hoverRectFixedParentRect) fixedParentOffset = calculateFixedParentOffset(hoverRectFixedParentRect)

  const top = hoverRect.top - ttRect.height / 2 + hoverRect.height / 2 + window.pageYOffset  - fixedParentOffset.top
  const left = hoverRect.left + hoverRect.width - marginOffset + window.pageXOffset - fixedParentOffset.left
  return { top, left }
}

const calculateLeft = (
  ttRect: DOMRect,
  hoverRect: DOMRect,
  hoverRectComputedStyles: CSSStyleDeclaration,
  hoverRectFixedParentRect?: DOMRect,
): TooltipState["transform"] => {

  let marginOffset = 0
  if (hoverRectComputedStyles.marginLeft) {
    marginOffset = parseFloat(hoverRectComputedStyles.marginLeft)
  }

  let fixedParentOffset = { top: 0, left: 0 }
  if (hoverRectFixedParentRect) fixedParentOffset = calculateFixedParentOffset(hoverRectFixedParentRect)

  // FIXME: Why does only the left position need the width of the arrow hardcoded in?
  const top = hoverRect.top - ttRect.height / 2 + hoverRect.height / 2 + window.pageYOffset  - fixedParentOffset.top
  const left = hoverRect.left - ttRect.width + marginOffset + window.pageXOffset - fixedParentOffset.left - 5 // 5 for arrow width
  return { top, left }
}

export const calculatePosition = {
  top: calculateTop,
  bottom: calculateBottom,
  left: calculateLeft,
  right: calculateRight,
}