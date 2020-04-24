import React from 'react'

import { calculatePosition, hasFixedAncestor } from './helpers'
import { TooltipArrow, TooltipBase, TooltipBody } from './Tooltip.components'
import { TooltipProps, TooltipState } from './types'

const Tooltip = ({
  children,
  body,
  position,
  title,
  tooltipId = "tooltip",
  ariaEssential = false,
}: TooltipProps) => {

  const thisRef = React.useRef<HTMLDivElement>(null)
  const childrenRef = React.useRef<HTMLElement>(null)

  const [state, setState] = React.useState<TooltipState>({
    visible: false,
    transform: { top: 0, left: 0 },
    position: 'none',
  })

  const deriveTooltipPosition = (hoverRect: DOMRect, hoverRectFixedParentRect: DOMRect) => {
    if (thisRef.current !== null) {
      let top = 0
      let left = 0
      const newState: TooltipState = { ...state, visible: false, position: 'none' }

      const ttRect = thisRef.current.getBoundingClientRect() as DOMRect
      const hoverRectStyles: CSSStyleDeclaration = window.getComputedStyle(childrenRef.current || thisRef.current)

      if (position) { // Dangerously trust the dev and place it wherever they want it
        ({ top, left } = calculatePosition[position](ttRect, hoverRect, hoverRectStyles, hoverRectFixedParentRect))
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
          ({ top, left } = calculatePosition.bottom(ttRect, hoverRect, hoverRectStyles, hoverRectFixedParentRect))
          newState.position = 'bottom'
          newState.visible = true
        } else if (fitsLeft) {
          ({ top, left } = calculatePosition.left(ttRect, hoverRect, hoverRectStyles, hoverRectFixedParentRect))
          newState.position = 'left'
          newState.visible = true
        } else if (fitsRight) {
          ({ top, left } = calculatePosition.right(ttRect, hoverRect, hoverRectStyles, hoverRectFixedParentRect))
          newState.position = 'right'
          newState.visible = true
        } else if (fitsAbove) {
          ({ top, left } = calculatePosition.top(ttRect, hoverRect, hoverRectStyles, hoverRectFixedParentRect))
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
      deriveTooltipPosition(rect, hasFixedAncestor(target))
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
      obj['aria-labelledby'] = tooltipId
    } else {
      obj['aria-describedby'] = tooltipId
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
      {...ariaAttrs}
      title={showNativeTitle ? title : undefined}
      onMouseLeave={onHoverLeave}
      onMouseEnter={onHoverEnter}
      onTouchStart={onTouch}
      onFocus={onFocus}
      style={{ display: 'inline-block' }}
    >
      {safeChildren}
      <TooltipBase
        id={tooltipId}
        ref={thisRef}
        aria-hidden={!state.visible}
        role={'tooltip'} // ARIA-role
        {...state}
      >
        <TooltipArrow position={state.position}/>
        <TooltipBody>{body}</TooltipBody>
      </TooltipBase>
    </div>
  )
}

export { Tooltip }
