import { useEffect, useRef } from "react"
import { $G } from "../service/Service"

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
      <label htmlFor="web">Your Web Address:</label>
      <input  className="forms_field-input" 
              autoComplete="off"
              type="url" 
              id="web" name="web"
              placeholder={$G.ACC.site}
              onChange={handlerChange} 
              ref={inputRef} />
    </div>
  )
}