import { useEffect, useRef } from "react"
import { $G } from "../service/Service"
import TooltipWrap from "./TooltipWrap"

export default function InputSettingsWebAddress() {
  const inputRef = useRef()

  useEffect(() => {
    inputRef.current.value = $G.ACC.site ? $G.ACC.site : ''
  }, [])

  const handlerChange = (e) => {
    e.target.value = e.target.value.toLowerCase()
    $G.ACC.site = e.target.value
  }

  return (
    <div className="forms_field">
      <TooltipWrap tip="Check if Your Web address is correct...">
      <input  className="forms_field-input" 
              autoComplete="off"
              type="url" name="url"
              placeholder={$G.ACC.site ? $G.ACC.site : "www.yoursite.com"}
              onChange={handlerChange} 
              ref={inputRef} />
      </TooltipWrap>
    </div>
  )
}