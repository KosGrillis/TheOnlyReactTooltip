import React from 'react'

import calculatePosition from './util/position'
import {
  deriveArrowStyles,
  deriveBaseStyles,
  deriveBodyStyles,
} from './util/style'

const TOOLTIP_ID = 'tooltip'

export type PositionOptions = 'top' | 'bottom' | 'left' | 'right'

export type Props = {
  children: React.ReactNode
  body: React.ReactNode
  position?: PositionOptions
  title?: string
  ariaEssential?: boolean
}

export type State = {
  visible: boolean
  transform: {
    x: string
    y: string
  }
  position: PositionOptions | 'none'
}

const Tooltip = ({
  children,
  body,
  position,
  title,
  ariaEssential = false,
}: Props) => {
  const thisRef = React.useRef<HTMLDivElement>(null)
  const [state, setState] = React.useState<State>({
    visible: false,
    transform: {
      x: '0',
      y: '0',
    },
    position: 'none',
  })

  const deriveTooltipPosition = (hoverRect: DOMRect) => {
    if (thisRef !== null && thisRef.current !== null) {
      let x = '0'
      let y = '0'
      let newState: State = { ...state, visible: true }
      const ttRect = thisRef.current.getBoundingClientRect() as DOMRect

      // Dangerously trust the dev and place it wherever they want it
      if (position) {
        ({ x, y } = calculatePosition[position](ttRect, hoverRect))
        newState.position = position

      } else { // Safely position it where it fits
        const docWidth = document.documentElement.clientWidth
        const docHeight = document.documentElement.clientHeight

        const rx = hoverRect.x + hoverRect.width // most right x
        const lx = hoverRect.x // most left x
        const ty = hoverRect.y // most top y
        const by = hoverRect.y + hoverRect.height // most bottom y

        const bBelow = by + ttRect.height <= docHeight
        const bRight = rx + ttRect.width <= docWidth
        const bLeft = lx - ttRect.width >= 0
        const bAbove = ty - ttRect.height >= 0
        const fitsBelow = bBelow
        const fitsRight = bRight && bBelow && bAbove
        const fitsLeft = bLeft && bBelow && bAbove
        const fitsAbove = bAbove

        if (fitsBelow) {
          ({ x, y } = calculatePosition.bottom(ttRect, hoverRect))
          newState.position = 'bottom'
        } else if (fitsLeft) {
          ({ x, y } = calculatePosition.left(ttRect, hoverRect))
          newState.position = 'left'
        } else if (fitsRight) {
          ({ x, y } = calculatePosition.right(ttRect, hoverRect))
          newState.position = 'right'
        } else if (fitsAbove) {
          ({ x, y } = calculatePosition.top(ttRect, hoverRect))
          newState.position = 'top'
        } else {
          x = '0'
          y = '0'
          newState.position = 'none'
          newState.visible = false
        }
      }

      newState = { ...newState, transform: { x, y } }
      setState(newState)
    }
  }

  const handleEventTarget = (
    target: React.BaseSyntheticEvent['currentTarget'],
  ) => {
    if (target !== null && body !== null) {
      const rect = target.getBoundingClientRect()
      deriveTooltipPosition(rect as DOMRect)
      document.addEventListener('keydown', ({ key }: KeyboardEvent) => {
        if (key === 'Escape' || key === 'Esc') {
          hide()
        }
      })
    }
  }

  const onHoverEnter = (e: React.MouseEvent<HTMLSpanElement>) =>
    handleEventTarget(e.currentTarget)

  const onHoverLeave = (_: React.MouseEvent<HTMLSpanElement>) => hide()

  const hide = () => {
    setState({
      visible: false,
      transform: { x: '0', y: '0' },
      position: 'none',
    })
    document.removeEventListener('touchstart', hide)
    document.removeEventListener('focusout', hide)
    document.removeEventListener('keydown', hide)
  }

  // For a11y, show the tooltip on touch as well
  const onTouch = (e: React.TouchEvent<HTMLSpanElement>) => {
    handleEventTarget(e.currentTarget)
    document.addEventListener('touchstart', hide)
  }

  // For a11y, also show the tooltip on focus
  const onFocus = (e: React.FocusEvent<HTMLSpanElement>) => {
    handleEventTarget(e.currentTarget)
    document.addEventListener('focusout', hide)
  }

  // For a11y, show the specified native title if the component
  // can't render the tooltip.
  const showNativeTitle = body === null || state.position === 'none'

  const ariaAttrs: React.HTMLAttributes<HTMLSpanElement> = {}
  if (ariaEssential) {
    ariaAttrs['aria-labelledby'] = TOOLTIP_ID
  } else {
    ariaAttrs['aria-describedby'] = TOOLTIP_ID
  }

  return (
    <div>
      <span
        onMouseEnter={onHoverEnter}
        onTouchStart={onTouch}
        onFocus={onFocus}
        onMouseLeave={onHoverLeave}
        title={showNativeTitle ? title : undefined}
        {...ariaAttrs}
      >
        {children}
      </span>
      <div
        id={TOOLTIP_ID}
        ref={thisRef}
        style={deriveBaseStyles(state)}
        aria-hidden={!state.visible}
        role={'tooltip'} // ARIA-role
      >
        <div style={deriveArrowStyles(state)} />
        <div style={deriveBodyStyles(state)}>{body}</div>
      </div>
    </div>
  )
}

export default Tooltip
