import { useEffect, useRef, useState } from "react"
import { Emitter } from "../service/Service"
const evt = {}

export default function Tip() {
  const [ showTip, setShowTip ] = useState({})
  const tipRef = useRef()

  useEffect(() => {
    if (showTip.show) setPosition(tipRef.current, evt)
  }, [showTip.show])

  useEffect(() => {
    Emitter.on('show tip', data => setShowTip(data))
    Emitter.on('show tip2', (data, e) => {
      // console.log('show tip2...', data, evt)
      setShowTip(data)
      evt.clientX = e.clientX
      evt.clientY = e.clientY
    })
    Emitter.on('move tip', e => setPosition(tipRef.current, e))
    return () => {
      Emitter.off('show tip')
      Emitter.off('show tip2')
      Emitter.off('move tip')
    }
  }, [])

  const setPosition = (element, event) => {
    if (element) {
      element.style.left = event?.clientX +'px'
      element.style.top = event?.clientY + 'px'
    }
  }

  if (showTip.show) {
    return (
      <div className={showTip.pos} data-text={showTip.tip} ref={tipRef}></div>
    )
  } else {
    return null
  }
}