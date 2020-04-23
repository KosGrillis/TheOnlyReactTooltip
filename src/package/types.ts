type TooltipPosition = 'top' | 'bottom' | 'left' | 'right' | 'none'

type TooltipState = {
  visible: boolean
  transform: {
    top: number
    left: number
  }
  position: TooltipPosition
}

type TooltipProps = {
  children: JSX.Element | string
  body: React.ReactNode
  tooltipId?: string
  position?: TooltipPosition
  title?: string
  ariaEssential?: boolean
}

export { TooltipPosition, TooltipState, TooltipProps }