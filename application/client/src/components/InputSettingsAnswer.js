import { useRef, useEffect, useState } from "react"
import { $G } from "../service/Service"
import TooltipWrap from "./TooltipWrap"

export default function InputSettingsAnswer(props) {
  const { message, idx } = props
  const [ msg, setMsg ] = useState("")
  const inputRef = useRef()

  useEffect(() => {
    if ($G.ACC.answer[idx]) {
      inputRef.current.value = $G.ACC.answer[idx]
      // setMsg($G.ACC.answer)
    }
  }, [])

  const handlerChange = (e) => {
    $G.ACC.answer[idx] = e.target.value
    // setMsg(e.target.value)
  }

  return (
    <div className="forms_field">
      <TooltipWrap tip="Enter the short answer for Your clients...">
      <input  className="forms_field-input" 
              autoComplete="off"
              type="text" name="answer"
              placeholder={$G.ACC.answer[idx] ? $G.ACC.answer[idx] : `Short answer for clients...`}
              onChange={handlerChange}
              ref={inputRef}
              required />
      </TooltipWrap>
    </div>
  )
}