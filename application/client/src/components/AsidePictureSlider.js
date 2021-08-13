import { useEffect, useRef } from "react"
import { useSlider } from "../js/useSlider"
import { $C, $G, $URL } from "../service/Service"
import { avatarEffect } from "../js/setAvatarEffect"

export default function AsidePictureSlider() {
  const { slider } = useSlider()
  const imgRef = useRef()

  useEffect(() => {
    $G.PAGE === 'LOGIN' && slider(imgRef)
    $G.PAGE === 'MAIN' && avatarEffect()
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