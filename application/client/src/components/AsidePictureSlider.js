import { useEffect } from "react"
import { useSlider } from "../js/useSlider"

export default function AsidePictureSlider() {
  const { slider } = useSlider()

  useEffect(() => {
    slider()
  }, [])

  return (
    <aside className="city_images">
      <div className="city_images-element hide085"></div>
    </aside>
  )
}