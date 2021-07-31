import { useEffect, useRef } from "react"
import { useSlider } from "../js/useSlider"
import { cn, GS } from "../js/classNames"

export default function AsidePictureSlider() {
  const { slider } = useSlider()
  const imgRef = useRef()

  useEffect(() => {
    slider(imgRef)
  }, [GS.slider])

  // console.log('aside slider ...', GS.slider, cn[GS.page].aside_img)

  return (
    <aside className={cn[GS.page].aside} ref={imgRef} >
      <div className={cn[GS.page].aside_img} ></div>
    </aside>
  )
}