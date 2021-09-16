import { useRef, useEffect } from "react"
import { $G, Emitter } from "../service/Service"
import TooltipWrap from "./TooltipWrap"

export default function InputSettingsAnswer(props) {
  const { idx } = props
  const inputRef = useRef()

  useEffect(() => {
    if ($G.ACC.answer[idx]) inputRef.current.value = $G.ACC.answer[idx]
  }, [])

  const handlerChange = (e) => {
    $G.ACC.answer[idx] = e.target.value
    Emitter.emit('update answer', e.target.value)
  }

  return (
    <div className="forms_field">
      <TooltipWrap tip="Enter the short answer for Your clients...">
      <input  className="forms_field-input" 
              autoComplete="off"
              type="text" name="answer"
              placeholder={$G.ACC.answer[idx] ? $G.ACC.answer[idx] : `Short answer ${idx} for clients...`}
              onChange={handlerChange}
              ref={inputRef}
              required />
      </TooltipWrap>
    </div>
  )
}