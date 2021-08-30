import { useEffect, useRef } from "react"
import { Emitter, $G } from "../service/Service"

export default function InputSettingsWebAddress() {
  const inputRef = useRef()

  useEffect(() => {
    inputRef.current.value = $G.ACC.site
  }, [])

  const handlerFocus = (e) => {
    // e.target.value = ''
    // Emitter.emit('clear web address')
  }

  const handlerChange = (e) => {
    e.target.value = e.target.value.toLowerCase()
    Emitter.emit('web address', e.target.value)
  }

  return (
    <div className="forms_field">
      <label htmlFor="web">Your Web Address:</label>
      <input  className="forms_field-input" 
              autoComplete="off"
              type="url" 
              id="web" name="web"
              placeholder={$G.ACC.site}
              onFocus={handlerFocus}
              onChange={handlerChange} 
              ref={inputRef} />
    </div>
  )
}