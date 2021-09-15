import { useCallback, useEffect, useRef, useState } from "react"
import { Emitter } from "../service/Service"

export default function Tip() {
  const [ showTip, setShowTip ] = useState({})
  // const [ coordinates, setCoordinates ] = useState({ x: 0, y: 0 })
  const tipRef = useRef()

  // const handleCursorMove = useCallback(e => setCoordinates({ x: e.clientX, y: e.clientY }), [])

  // useEffect(() => {
    // window.addEventListener("mousemove", handleCursorMove)
    // return () => {
    //   window.removeEventListener("mousemove", handleCursorMove)
    // }
  // }, [])

  // useEffect(() => {
    // setup initial position of tip, when You already hover over element without move cursor
    // if (showTip.show && tipRef.current) {
    //   tipRef.current.style.left = coordinates.x +'px'
    //   tipRef.current.style.top = coordinates.y + 'px'
    // }
  // }, [showTip.show])

  useEffect(() => {
    Emitter.on('show tip', data => {
      setShowTip(data)
      if (tipRef.current && data.event) {
        tipRef.current.style.left = data.event.clientX +'px'
        tipRef.current.style.top = data.event.clientY + 'px'
      }
    })
    Emitter.on('move tip', e => {
      if (tipRef.current) {
        tipRef.current.style.left = e.clientX +'px'
        tipRef.current.style.top = e.clientY + 'px'
      }
    })
    return () => {
      Emitter.off('show tip')
      Emitter.off('move tip')
    }
  }, [])

  if (showTip.show) {
    return (
      <div className={showTip.pos} data-text={showTip.tip} ref={tipRef}></div>
    )
  } else {
    return null
  }
}