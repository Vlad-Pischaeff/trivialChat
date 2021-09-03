import { useRef, useEffect, useState } from "react"
import { $G } from "../service/Service"

export default function InputSettingsAnswer() {
  const [ msg, setMsg ] = useState('')
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
      <div className="forms_field" data-tip="Enter the short answer for Your clients...">
        <input  className="forms_field-input" 
                autoComplete="off"
                type="text" name="answer"
                placeholder="Short answer for clients..."
                onChange={handlerChange} 
                ref={inputRef}
                required />
      </div>
      <div className="chat_field-messageto">
        <p className="msg-data">{new Date('2021-07-31').toLocaleString()}</p>
        <p className="msg-text">{msg ? msg : "short answer for client..."}</p>
      </div>
    </>
  )
}