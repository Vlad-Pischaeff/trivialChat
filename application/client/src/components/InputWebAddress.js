import { useRef } from "react"
import { Emitter } from "../service/Service"

export default function InputWebAddress() {
  const inputRef = useRef()

  const handlerFocus = (e) => {
    e.target.value = ''
  }

  const handlerChange = (e) => {
    Emitter.emit('web address', e.target.value)
  }

  return (
    <div className="forms_field">
      <label htmlFor="web">Type Your Web Address:</label>
      <input  className="forms_field-input" 
              autoComplete="off"
              type="url" 
              id="web" name="web"
              placeholder="www.yoursite.com"
              required
              autoFocus
              onFocus={handlerFocus}
              onChange={handlerChange}
              ref={inputRef} />
    </div>
  )
}