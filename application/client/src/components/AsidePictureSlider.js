import { useEffect, useRef } from "react"
import { __AsideSlider } from "../js/__AsideSlider"
import { __AvatarEffect } from "../js/__AvatarEffect"
import { $C, $G, $URL } from "../service/Service"

export default function AsidePictureSlider() {
  const { slider } = __AsideSlider()
  const imgRef = useRef()

  useEffect(() => {
    $G.PAGE === 'LOGIN' && slider(imgRef)
    $G.PAGE === 'MAIN' && __AvatarEffect()
  }, [])

  console.log('aside slider ...', $G.PAGE, $C[$G.PAGE])

  return (
    <aside className={$C[$G.PAGE].aside} ref={imgRef} >
      {
        $G.PAGE === 'LOGIN'
          ? <div className={$C[$G.PAGE].aside_img} ></div>
          : <>
              <div className="profile">
                <div className="profile_avatarbg"></div>
                <img className="profile_avatar" src={`${$URL}/img/app/profile2.png`} />
              </div>
              <img className="settings_img" src={`${$URL}/img/app/settings.svg`} />
            </>
      }
    </aside>
  )
}