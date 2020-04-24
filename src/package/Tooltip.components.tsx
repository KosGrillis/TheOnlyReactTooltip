import React from 'react'

import { TooltipState } from './types'

type TooltipBaseProps = React.HTMLAttributes<HTMLDivElement> & {
  position: TooltipState["position"],
  transform: TooltipState["transform"],
  visible: TooltipState["visible"],
}

const TooltipBase = React.forwardRef<HTMLDivElement, TooltipBaseProps>(({
  children,
  id,
  role,
  visible,
  transform,
  position,
}, ref) => {

  const style: React.CSSProperties = React.useMemo(() => {
    const styles: React.CSSProperties = {
      position: 'absolute',
      zIndex: 1,
      cursor: 'initial',
      visibility: visible ? 'visible' : 'hidden',
      top: `${transform.top}px`,
      left: `${transform.left}px`,
    }

    switch (position) {
      case "bottom": styles["marginTop"] = '5px'; break
      case "top": styles["marginTop"] = '-5px'; break
      case "left": styles["marginRight"] = '5px'; break
      case "right": styles["marginLeft"] = '5px'; break
      default: break
    }

    return styles
  }, [position, transform, visible])

  return (
    <div ref={ref} id={id} style={style} role={role}>
      {children}
    </div>
  )
})

type TooltipArrowProps = {
  position: TooltipState["position"],
}

const TooltipArrow: React.FC<TooltipArrowProps> = ({
  position,
}) => {

  const style: React.CSSProperties = React.useMemo(() => {
    let styles: React.CSSProperties = {
      marginTop: '-5px',
      position: 'absolute',
      width: 0,
      height: 0,
      borderColor: 'transparent',
      borderStyle: 'solid',
    }

    switch (position) {
      case "bottom": styles = {
        ...styles,
        top: 0,
        left: '50%',
        marginLeft: '-5px',
        borderWidth: '0 5px 5px',
        borderBottomColor: '#000',
      }; break
      case "top": styles = {
        ...styles,
        top: 'auto',
        left: '50%',
        bottom: '-5px',
        marginLeft: '-5px',
        borderWidth: "5px 5px 0",
        borderTopColor: "#000",
      }; break
      case "left": styles = {
        ...styles,
        top: "50%",
        marginTop: "-5px",
        borderWidth: "5px 0 5px 5px",
        borderLeftColor: "#000",
        right: "-5px",
        left: "auto",
      }; break
      case "right": styles = {
        ...styles,
        top: "50%",
        left: "auto",
        marginLeft: "-5px",
        borderWidth: "5px 5px 5px 0",
        borderRightColor: "#000",
      }; break
      default: break
    }

  return styles
  }, [position])

  return <div style={style}/>
}

const TooltipBody: React.FC<{}> = ({
  children,
}) => {

  const style: React.CSSProperties = React.useMemo(() => {
    return {
      maxWidth: '200px',
      padding: '3px 8px',
      color: '#fff',
      textAlign: 'center',
      backgroundColor: '#000',
      borderRadius: '4px',
    }
  }, [])

  return (
    <div style={style}>
      {children}
    </div>
  )
}

export { TooltipBase, TooltipArrow, TooltipBody }