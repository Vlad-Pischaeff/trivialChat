import { useRef, useEffect, useState } from "react"
import { $G } from "../service/Service"
import TooltipWrap from "./TooltipWrap"
import Message from "./Message"

export default function InputSettingsGreeting() {
  const [ msg, setMsg ] = useState("")
  const inputRef = useRef()

  useEffect(() => {
    if ($G.ACC.greeting) {
      inputRef.current.value = $G.ACC.greeting
      setMsg($G.ACC.greeting)
    }
  }, [])

  const handlerChange = (e) => {
    $G.ACC.greeting = e.target.value
    setMsg(e.target.value)
  }

  return (
    <>
      <div className="forms_field">
        <TooltipWrap tip="Enter the Greeting for Your clients...">
        <input  className="forms_field-input" 
                autoComplete="off"
                type="text" name="greeting"
                placeholder={$G.ACC.greeting ? $G.ACC.greeting : "Greeting for clients..."}
                onChange={handlerChange} 
                ref={inputRef} 
                required />
        </TooltipWrap>
      </div>
      <Message item={{'msg1': msg ? msg : "greeting message to client...", 'date': '2021-07-31'}} />
    </>
  )
}