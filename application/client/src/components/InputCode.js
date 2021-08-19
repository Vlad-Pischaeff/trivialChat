import { useEffect, useRef } from "react"
import { $G, $URL, Emitter } from "../service/Service"
import aes from 'crypto-js/aes'

export default function InputCode() {
  const inputRef = useRef()

  useEffect(() => {
    Emitter.on('web address', data => inputRef.current.value = crypt(data))
    return () => {
      Emitter.off('web address')
    }
  }, [])

  /* use encodeURIComponent / decodeURIComponent when 
   * you send encrypted value via GET request as PARAMETER
   * 
   */
  const crypt = (str) => {
    return aes.encrypt(str, $G.ACC.email).toString()
  }

  const handlerClick = () => {
    inputRef.current.select()
    navigator.clipboard.writeText(inputRef.current.value)
    /* Alert the copied text */
    alert("Copied the text: " + inputRef.current.value)
  }

  return (
    <div className="forms_field">
    <label htmlFor="code">Your Code:</label>
    <div className="forms_field-code">
      <input  className="forms_field-input" 
              autoComplete="off"
              type="text" 
              id="code" 
              name="code"
              disabled
              ref={inputRef} />
      <picture  className="forms_field-inputcopy" 
                data-text="Copy code into the clipboard...">
        <img  src={`${$URL}/img/app/copy.png`} 
              alt='copy code' 
              onClick={handlerClick} />
      </picture>
    </div>
    </div>
  )
}