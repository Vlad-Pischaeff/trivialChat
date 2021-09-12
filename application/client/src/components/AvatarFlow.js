import { useEffect, useRef, useState } from "react"
import { $URL, $G } from "../service/Service"
import __AvatarEffect from "../js/__AvatarEffect"
import __ResizeImage from "../js/__ResizeImage"
import TooltipWrap from "./TooltipWrap"
import { useHistory, useLocation } from "react-router"

export default function AvatarFlow() {
  const location = useLocation()
  const history = useHistory()
  const [ img, setImg ] = useState(null)
  const [ imgResized, setImgResized ] = useState(null)
  const refBg = useRef()
  const refAvatar = useRef()
  const inputRef = useRef()

  useEffect(() => {
    let timetID = setInterval(() => { 
      __AvatarEffect(refAvatar, refBg)
    }, 2000)
    return () => {
      timetID = null
    }
  }, [])

  useEffect(() => {
    async function setResizedImage(img) {
      const image = await __ResizeImage(img)
      setImgResized(image)
    } 
    if (img) {
      setResizedImage(img)
    }
  }, [img])

  useEffect(() => {
    if (imgResized) {
      let loc = {
        pathname: '/cropimage',
        state: { background: location, img: imgResized}
      }
      history.push(loc)
    }
  }, [imgResized])

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      reader.readAsDataURL(e.target.files[0])
      reader.onloadend = () => setImg(reader.result)
      reader.onerror = () => console.log('error while read file...')
    }
  }

  const handlerClick = (e) => {
    inputRef.current.click()
  }

  return (
    <TooltipWrap position="tip-right" tip="Choose a picture to represent You to users...">
      <section className="profile" onClick={handlerClick}>
        <input id="file-input" type="file" accept="image/*" onChange={onSelectFile} className="none" ref={inputRef}/>
        <div className="profile_avatarbg" ref={refBg}></div>
        <img className="profile_avatar" src={$G.ACC.avatar ? $G.ACC.avatar : `${$URL}/img/app/profile2.png`} alt='' ref={refAvatar}/>
      </section>
    </TooltipWrap>
  )
}