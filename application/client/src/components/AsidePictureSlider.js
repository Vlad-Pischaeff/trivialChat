import { useEffect, useRef } from "react"
import { Link, useLocation } from "react-router-dom"
import { __AsideSlider } from "../js/__AsideSlider"
import { $C, $G, $URL } from "../service/Service"
import AvatarFlow from "./AvatarFlow"
import TooltipWrap from "./TooltipWrap"

export default function AsidePictureSlider() {
  const location = useLocation()
  const { slider } = __AsideSlider()
  const imgRef = useRef()

  useEffect(() => {
    $G.PAGE === 'LOGIN' && slider(imgRef)
  }, [])

  // console.log('aside slider ...', $G.PAGE, $C[$G.PAGE])

  return (
    <aside className={$C[$G.PAGE].aside} ref={imgRef} >
      {
        $G.PAGE === 'LOGIN'
          ? <div className={$C[$G.PAGE].aside_img} ></div>
          : <>
              <AvatarFlow />
              <Link to={{ pathname: "/settings", state: { background: location }}}>
                <TooltipWrap tip="Configure Your profile settings...">
                  <section>
                    <img className="settings_img" src={`${$URL}/img/app/settings.svg`} alt='' />
                  </section>
                </TooltipWrap>
              </Link>
            </>
      }
    </aside>
  )
}