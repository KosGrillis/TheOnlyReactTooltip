import { State as PositionState } from '..'

const calculateTop = (ttRect: DOMRect, hoverRect: DOMRect): PositionState["transform"] => {
  let x = '0'
  let y = '0'

  y = `-${hoverRect.height + ttRect.height}`

  if (ttRect.width > hoverRect.width) {
    x = `-${(ttRect.width - hoverRect.width) / 2}`
  } else {
    x = `${(hoverRect.width - ttRect.width) / 2}`
  }

  return { x, y }
}

const calculateBottom = (ttRect: DOMRect, hoverRect: DOMRect): PositionState["transform"] => {
  let x = '0'
  const y = '0'

  if (ttRect.width > hoverRect.width) {
    x = `-${(ttRect.width - hoverRect.width) / 2}`
  } else {
    x = `${(hoverRect.width - ttRect.width) / 2}`
  }

  return { x, y }
}

const calculateRight = (ttRect: DOMRect, hoverRect: DOMRect): PositionState["transform"] => {
  const x = `${hoverRect.width}`
  const y = `-${(hoverRect.height / 2 + ttRect.height / 2)}`
  return { x, y }
}

const calculateLeft = (ttRect: DOMRect, hoverRect: DOMRect): PositionState["transform"] => {
  const x = `-${hoverRect.width + (ttRect.width - hoverRect.width)}`
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

