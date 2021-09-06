import { useEffect, useRef, useState } from "react"
import { Emitter } from "../service/Service"

export default function Tip() {
  const [ showTip, setShowTip ] = useState({})
  const tipRef = useRef()

  useEffect(() => {
    Emitter.on('show tip', data => setShowTip(data))
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