import { useRef, useEffect, useState } from "react"
import { $G } from "../service/Service"
import TooltipWrap from "./TooltipWrap"
import Message from './Message'

export default function InputSettingsAnswer() {
  const [ msg, setMsg ] = useState("")
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
      <Message item={{'msg0': msg ? msg : "Short answer for clients...", 'date': '2021-07-31'}} />
    </>
  )
}