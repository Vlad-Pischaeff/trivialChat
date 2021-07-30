import { useEffect } from "react"
import { useSlider } from "../js/useSlider"
import { cn, gStates } from "../js/classNames"

export default function AsidePictureSlider() {
  const { slider } = useSlider()

  useEffect(() => {
    gStates.slider && slider()
  }, [gStates.slider])

  console.log('aside slider ...', gStates.slider)
  
  return (
    <aside className={cn[gStates.page].aside} >
      <div className={cn[gStates.page].aside_img} ></div>
    </aside>
  )
}