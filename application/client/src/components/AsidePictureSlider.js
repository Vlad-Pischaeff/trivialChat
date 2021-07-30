import { useEffect, useRef } from "react"
import { useSlider } from "../js/useSlider"
import { cn, gStates } from "../js/classNames"

export default function AsidePictureSlider() {
  const { slider } = useSlider()
  const imgRef = useRef()

  useEffect(() => {
    slider(imgRef)
  }, [gStates.slider])

  console.log('aside slider ...', gStates.slider, cn[gStates.page].aside_img)

  return (
    <aside className={cn[gStates.page].aside} ref={imgRef} >
      <div className={cn[gStates.page].aside_img} ></div>
    </aside>
  )
}