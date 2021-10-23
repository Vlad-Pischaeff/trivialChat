import { useEffect, useRef } from "react"
import { useAuth } from "../hooks/auth.hook"
import { $G } from '../service/Service'
import { Emitter } from "../service/ServiceEmitter"

export default function InputEmail({ type }) {
  const email = useAuth()
  const inputRef = useRef()

  useEffect(() => {
    Emitter.on(`wrong email ${type}`, setError)
    return () => Emitter.off(`wrong email ${type}`)
  }, [type])

  useEffect(() => {
    type === 'login'
      ? $G.EMAIL = email.value
      : $G.SEMAIL = email.value
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

  // console.log(`input email ${type} ...`, email.value)

  return (
    <div className="forms_field">
      <input  className="forms_field-input" 
              type="email" 
              name="email" 
              placeholder="Email" 
              required
              autoFocus
              {...email}
              onFocus={handlerFocus} 
              ref={inputRef} />
    </div>
  )
}