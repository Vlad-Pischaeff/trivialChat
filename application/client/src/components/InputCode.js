import { useRef } from "react"

export default function InputCode() {
  const inputRef = useRef()

  return (
    <div className="forms_field">
    <label htmlFor="code">Your Code:</label>
    <input  className="forms_field-input" 
            autoComplete="off"
            type="text" 
            id="code" name="code"
            disabled
            ref={inputRef} />
    </div>
  )
}