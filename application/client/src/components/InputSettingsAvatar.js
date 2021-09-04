import { useRef, useState } from "react"
import { $URL } from '../service/Service'
import TooltipWrap from "./TooltipWrap"

export default function InputSettingsAvatar() {
  const [ img, setImg ] = useState(null)
  const inputRef = useRef()

  const onSelectFile = (e) => {
    console.log('onSelectFile...', e)
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      reader.readAsDataURL(e.target.files[0])
      reader.onloadend = () => {setImg(reader.result)}
    }
  }

  const handlerClick = (e) => {
    e.preventDefault()
    inputRef.current.click()
  }

  return (
    <div className="pos-rel">
      <TooltipWrap tip="Load new image for Your avatar...">
        <input id="file-input" type="file" accept="image/*" onChange={onSelectFile} className="none" ref={inputRef}/>
        <img className="forms_avatar-img" src={`${$URL}/img/app/profile2.png`} alt='' onClick={handlerClick}/>
      </TooltipWrap>
    </div>
  )
}