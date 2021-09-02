import { useEffect, useRef } from "react"
import { $G } from "../service/Service"

export default function InputSettingsTitle() {
  const inputRef = useRef()

  useEffect(() => {
    inputRef.current.value = $G.ACC.title ? $G.ACC.title : ''
  }, [])

  const handlerChange = (e) => {
    $G.ACC.title = e.target.value
  }

  return (
    <div  className="forms_field" data-tip="Enter the Title for Your application...">
      <input  className="forms_field-input" 
              autoComplete="off"
              type="text" name="title"
              placeholder={$G.ACC.title ? $G.ACC.title : "Your organisation..."}
              onChange={handlerChange} 
              ref={inputRef}
              required />
    </div>
  )
}