import { useEffect, useRef } from "react"
import { useAuth } from "../hooks/auth.hook"
import { $G } from '../service/Service'
import { Emitter } from "../service/ServiceEmitter"

export default function InputPassword({ type }) {
  const password = useAuth()
  const inputRef = useRef()

  useEffect(() => {
    Emitter.on(`wrong password ${type}`, setError)
    return () => Emitter.off(`wrong password ${type}`)
  }, [type])

  useEffect(() => {
    type === 'login'
      ? $G.PASSWORD = password.value
      : $G.SPASSWORD = password.value
  })

  const handlerFocus = (e) => {
    e.target.value = ''
    resetError()
    Emitter.emit(`clear warnings ${type}`)
  }

  const resetError = () => {
    inputRef.current &&
    inputRef.current.classList.contains('error') && 
    inputRef.current.classList.remove('error')
  }

  const setError = () => {
    inputRef.current && 
    !inputRef.current.classList.contains('error') && 
    inputRef.current.classList.add('error')
  }

  // console.log(`input password ${type} ...`, password.value)

  return (
    <div className="forms_field">
      <input  className="forms_field-input" 
              type="password" 
              name="password" 
              placeholder="Password" 
              required
              {...password}
              onFocus={handlerFocus} 
              ref={inputRef} />
    </div>
  )
}