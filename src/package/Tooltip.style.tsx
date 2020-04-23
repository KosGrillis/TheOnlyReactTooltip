import css from '@emotion/css'
import styled from '@emotion/styled'

import { TooltipState } from './types'

type TooltipBaseProps = {
  position: TooltipState["position"],
  transform: TooltipState["transform"],
  visible: TooltipState["visible"],
}

const TooltipBase = styled('div')<TooltipBaseProps>`
  position: absolute;
  z-index: 1;
  cursor: initial;
  visibility: ${({ visible }) => visible ? 'visible' : 'hidden'};
  top: ${({ transform: { top } }) => top}px;
  left: ${({ transform: { left } }) => left}px;
  ${({ position }) => {
    switch (position) {
      case "bottom": return css`
          margin-top: 5px;
        `
      case "top":
        return css`
          margin-top: -5px;
        `
      case "left":
        return css`
          margin-right: 5px;
        `
      case "right":
        return css`
          margin-left: 5px;
        `
      default:
        return ''
    }
  }}
`

type TooltipArrowProps = {
  position: TooltipState["position"],
}

const TooltipArrow = styled('div')<TooltipArrowProps>`
  margin-top: -5px;
  position: absolute;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
  ${({ position }) => {
    switch (position) {
      case "bottom":
        return css`
          top: 0;
          left: 50%;
          margin-left: -5px;
          border-width: 0 5px 5px;
          border-bottom-color: #000;
        `
      case "top":
        return css`
          top: auto;
          left: 50%;
          bottom: -5px;
          margin-left: -5px;
          border-width: 5px 5px 0;
          border-top-color: #000;
        `
      case "left":
        return css`
          top: 50%;
          marginTop: -5px;
          border-width: 5px 0 5px 5px;
          border-left-color: #000;
          right: -5px;
          left: auto;
        `
      case "right":
        return css`
          top: 50%;
          left: auto;
          margin-left: -5px;
          border-width: 5px 5px 5px 0;
          border-right-color: #000;
        `
      default:
        return ''
    }
  }}
`

const TooltipBody = styled('div')`
  max-width: 200px;
  padding: 3px 8px;
  color: #fff;
  text-align: center;
  background-color: #000;
  border-radius: 4px;
`

export { TooltipBase, TooltipArrow, TooltipBody }