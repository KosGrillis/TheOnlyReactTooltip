import { CSSProperties } from 'react'

import { State as PositionState } from '..'

const tooltipBaseStyles: CSSProperties = {
  position: 'absolute',
  zIndex: 1,
}

const tooltipArrowBaseStyles: CSSProperties = {
  marginTop: '-5px',
  position: 'absolute',
  width: '0',
  height: '0',
  borderColor: 'transparent',
  borderStyle: 'solid',
}

const tooltipBodyBaseStyles: CSSProperties = {
  maxWidth: '200px',
  padding: '3px 8px',
  color: '#fff',
  textAlign: 'center',
  backgroundColor: '#000',
  borderRadius: '4px',
}

const deriveBaseStyles = (state: PositionState): CSSProperties => {
  const style: CSSProperties = {
    visibility: state.visible ? 'visible' : 'hidden',
    transform: `translate(${state.transform.x}px,${state.transform.y}px)`,
  }

  if (state.position === 'right') {
    style.marginLeft = '5px'
  }
  if (state.position === 'left') {
    style.marginRight = '5px'
  }
  if (state.position === 'top') {
    style.marginTop = '-5px'
  }
  if (state.position === 'bottom') {
    style.marginTop = '5px'
  }

  return { ...tooltipBaseStyles, ...style }
}

const deriveArrowStyles = (state: PositionState): CSSProperties => {
  const style: CSSProperties = {}

  if (state.position === 'right') {
    style.top = '50%'
    style.left = 'auto'
    style.marginLeft = '-5px'
    style.borderWidth = '5px 5px 5px 0'
    style.borderRightColor = '#000'
  }
  if (state.position === 'left') {
    style.top = '50%'
    style.marginTop = '-5px'
    style.borderWidth = '5px 0 5px 5px'
    style.borderLeftColor = '#000'
    style.right = '-5px'
    style.left = 'auto'
  }
  if (state.position === 'top') {
    style.top = 'auto'
    style.left = '50%'
    style.bottom = '-5px'
    style.marginLeft = '-5px'
    style.borderWidth = '5px 5px 0'
    style.borderTopColor = '#000'
  }
  if (state.position === 'bottom') {
    style.top = 0
    style.left = '50%'
    style.marginLeft = '-5px'
    style.borderWidth = '0 5px 5px'
    style.borderBottomColor = '#000'
  }

  return { ...tooltipArrowBaseStyles, ...style }
}

const deriveBodyStyles = (_: PositionState): CSSProperties => {
  return tooltipBodyBaseStyles
}

export { deriveBaseStyles, deriveArrowStyles, deriveBodyStyles }
