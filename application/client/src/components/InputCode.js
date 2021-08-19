import { useEffect, useRef } from "react"
import { $G, $URL, Emitter } from "../service/Service"
import aes from 'crypto-js/aes'
// import CryptoJS from 'crypto-js'

export default function InputCode() {
  const inputRef = useRef()

  useEffect(() => {
    Emitter.on('web address', data => {
      inputRef.current.value = crypt(data)
      // let bytes = aes.decrypt(inputRef.current.value, $G.ACC.email)
      // let str = bytes.toString(CryptoJS.enc.Utf8)
      // console.log('decrypt2 ...', str)
    })
    Emitter.on('clear web address', () => inputRef.current.value = '')
    return () => {
      Emitter.off('web address')
      Emitter.off('clear web address')
    }
  }, [])

  /* use encodeURIComponent / decodeURIComponent when 
   * you send encrypted value via GET request as PARAMETER
   */
  const crypt = (str) => {
    return aes.encrypt(str, $G.ACC.email).toString()
  }
  
  console.log('InputCode render ...', $G)

  const handlerClick = () => {
    inputRef.current.select()
    navigator.clipboard.writeText(inputRef.current.value)
    /* Alert the copied text */
    alert("Copied the text: " + inputRef.current.value)
  }

  return (
    <div className="forms_field">
    <label htmlFor="code">Get Your Code:</label>
    <div className="forms_field-code">
      <input  className="forms_field-input" 
              autoComplete="off"
              type="text" 
              id="code" 
              name="code"
              disabled
              ref={inputRef} />
      <picture  className="forms_field-inputcopy" 
                data-text="Copy CODE to the clipboard and then paste it to the WordPress plugin configuration page">
        <img  src={`${$URL}/img/app/copy.png`} 
              alt='copy code' 
              onClick={handlerClick} />
      </picture>
    </div>
    </div>
  )
}