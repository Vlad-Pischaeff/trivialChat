import { useEffect, useRef } from "react"
import { $G } from "../service/Service"

export default function InputSettingsDescription() {
  const inputRef = useRef()

  useEffect(() => {
    inputRef.current.value = $G.ACC.desc ? $G.ACC.desc : ''
  }, [])

  const handlerChange = (e) => {
    $G.ACC.desc = e.target.value
  }

  return (
    <div className="forms_field" data-tip="Enter the Description for Your application...">
      <input  className="forms_field-input" 
              autoComplete="off"
              type="text" name="desc"
              placeholder={$G.ACC.desc ? $G.ACC.desc : "Description..."}
              onChange={handlerChange} 
              ref={inputRef}
              required />
    </div>
  )
}