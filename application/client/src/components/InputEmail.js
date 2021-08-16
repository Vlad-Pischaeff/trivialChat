import { useEffect, useRef } from "react"
import { useAuth } from "../hooks/auth.hook"
import { $G, Emitter } from '../service/Service'

export default function InputEmail(props) {
  const { type } = props
  const email = useAuth()
  const inputRef = useRef()

  useEffect(() => {
    Emitter.on(`wrong email ${type}`, setError)
    Emitter.on('input change', resetError)
    return () => {
      Emitter.off(`wrong email ${type}`)
      Emitter.off('input change')
    }
  }, [])

  useEffect(() => {
    $G.EMAIL = email.value
  })

  const handlerFocus = (e) => {
    e.target.value = ''
    resetError()
    Emitter.emit(`clear warnings ${type}`)
  }

  const resetError = () => {
    inputRef.current && inputRef.current.classList.remove('error')
  }

  const setError = () => {
    inputRef.current && inputRef.current.classList.add('error')
  }

  console.log('input email ...', email.value, $G.EMAIL, inputRef)

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