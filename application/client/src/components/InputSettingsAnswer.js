import { useRef, useEffect, useState } from "react"
import { $G } from "../service/Service"
import TooltipWrap from "./TooltipWrap"

export default function InputSettingsAnswer() {
  const [ msg, setMsg ] = useState('')
  const inputRef = useRef()

  useEffect(() => {
    if ($G.ACC.answer) {
      inputRef.current.value = $G.ACC.answer
      setMsg($G.ACC.answer)
    }
  }, [])

  const handlerChange = (e) => {
    $G.ACC.answer = e.target.value
    setMsg(e.target.value)
  }

  return (
    <>
      <div className="forms_field">
        <TooltipWrap tip="Enter the short answer for Your clients...">
        <input  className="forms_field-input" 
                autoComplete="off"
                type="text" name="answer"
                placeholder={$G.ACC.answer ? $G.ACC.answer : "Short answer for clients..."}
                onChange={handlerChange}
                ref={inputRef}
                required />
        </TooltipWrap>
      </div>
      <div className="chat_field-messageto">
        <p className="msg-data">{new Date('2021-07-31').toLocaleString()}</p>
        <p className="msg-text">{msg ? msg : "short answer for client..."}</p>
      </div>
    </>
  )
}