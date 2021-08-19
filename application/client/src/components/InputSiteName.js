import { useEffect, useRef } from "react"
import { useAuth } from "../hooks/auth.hook"

export default function InputSiteName() {
  const sitename = useAuth()
  const inputRef = useRef()

  useEffect(() => {
    inputRef.current.value = ''
  }, [])

  const handlerFocus = (e) => {
    e.preventDefault()
    console.log('site name focus ...', e)
    e.target.value = ''
  }

  return (
    <div className="forms_field">
      <label htmlFor="web">Type Your Web Address:</label>
      <input  className="forms_field-input" 
              autoComplete="off"
              type="url" 
              id="web" name="web"
              placeholder="www.yoursite.com"
              required
              autoFocus
              {...sitename}
              onFocus={handlerFocus} 
              ref={inputRef} />
    </div>
  )
}