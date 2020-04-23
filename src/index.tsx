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
  children: JSX.Element | string
  body: React.ReactNode
  position?: PositionOptions
  title?: string
  ariaEssential?: boolean
}

export type State = {
  visible: boolean
  transform: {
    top: number
    left: number
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
  const childrenRef = React.useRef<HTMLElement>(null)

  const [state, setState] = React.useState<State>({
    visible: false,
    transform: { top: 0, left: 0 },
    position: 'none',
  })

  const deriveTooltipPosition = (hoverRect: DOMRect) => {
    if (thisRef.current !== null) {
      let top = 0
      let left = 0
      const newState: State = { ...state, visible: false, position: 'none' }

      const ttRect = thisRef.current.getBoundingClientRect() as DOMRect
      const hoverRectStyles: CSSStyleDeclaration = window.getComputedStyle(childrenRef.current || thisRef.current)

      if (position) { // Dangerously trust the dev and place it wherever they want it
        ({ top, left } = calculatePosition[position](ttRect, hoverRect, hoverRectStyles))
        newState.position = position
        newState.visible = true
      } else { // Safely position it where it fits
        const docWidth = document.documentElement.clientWidth
        const docHeight = document.documentElement.clientHeight

        const rx = hoverRect.x + hoverRect.width  // most right x
        const lx = hoverRect.x                    // most left x
        const ty = hoverRect.y                    // most top y
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
          ({ top, left } = calculatePosition.bottom(ttRect, hoverRect, hoverRectStyles))
          newState.position = 'bottom'
          newState.visible = true
        } else if (fitsLeft) {
          ({ top, left } = calculatePosition.left(ttRect, hoverRect, hoverRectStyles))
          newState.position = 'left'
          newState.visible = true
        } else if (fitsRight) {
          ({ top, left } = calculatePosition.right(ttRect, hoverRect, hoverRectStyles))
          newState.position = 'right'
          newState.visible = true
        } else if (fitsAbove) {
          ({ top, left } = calculatePosition.top(ttRect, hoverRect, hoverRectStyles))
          newState.position = 'top'
          newState.visible = true
        }
      }

      setState({ ...newState, transform: { top, left } })
    }
  }

  const handleEventTarget = (
    target: React.BaseSyntheticEvent['currentTarget'],
  ) => {
    if (target !== null && body !== null) {
      const rect = target.getBoundingClientRect()
      deriveTooltipPosition(rect)
      document.addEventListener('keydown', ({ key }: KeyboardEvent) => {
        if (key === 'Escape' || key === 'Esc') {
          hide()
        }
      })
    }
  }

  const onHoverEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    handleEventTarget(e.currentTarget)
  }

  const onHoverLeave = (_: React.MouseEvent<HTMLDivElement>) => hide()

  const hide = () => {
    setState({
      visible: false,
      transform: { top: 0, left: 0 },
      position: 'none',
    })
    document.removeEventListener('touchstart', hide)
    document.removeEventListener('focusout', hide)
    document.removeEventListener('keydown', hide)
  }

  // For a11y, show the tooltip on touch as well
  const onTouch = (e: React.TouchEvent<HTMLDivElement>) => {
    handleEventTarget(e.currentTarget)
    document.addEventListener('touchstart', hide)
  }

  // For a11y, also show the tooltip on focus
  const onFocus = (e: React.FocusEvent<HTMLDivElement>) => {
    handleEventTarget(e.currentTarget)
    document.addEventListener('focusout', hide)
  }

  // For a11y, show the specified native title if the component can't render the tooltip.
  const showNativeTitle = React.useMemo(() => (
    body === null || state.position === 'none'
  ), [body, state.position])

  const ariaAttrs: React.HTMLAttributes<HTMLDivElement> = React.useMemo(() => {
    const obj = {}
    if (ariaEssential) {
      obj['aria-labelledby'] = TOOLTIP_ID
    } else {
      obj['aria-describedby'] = TOOLTIP_ID
    }
    return obj
  }, [ariaEssential])

  const safeChildren = React.useMemo(() => {
    if (typeof children === 'string') {
      return children
    }

    return React.cloneElement(children as JSX.Element, { ref: childrenRef })
  }, [children])

  return (
    <div
      style={{ display: "inline-block" }}
      onMouseLeave={onHoverLeave}
      onMouseEnter={onHoverEnter}
      onTouchStart={onTouch}
      onFocus={onFocus}
      title={showNativeTitle ? title : undefined}
      {...ariaAttrs}
    >
      {safeChildren}
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
