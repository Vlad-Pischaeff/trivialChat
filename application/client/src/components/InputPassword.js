import { useEffect, useRef } from "react"
import { useAuth } from "../hooks/auth.hook"
import { $G, Emitter } from '../service/Service'

export default function InputPassword(props) {
  const { type } = props
  const password = useAuth()
  const inputRef = useRef()

  useEffect(() => {
    Emitter.on(`wrong password ${type}`, setError)
    Emitter.on(`input change`, resetError)
    return () => {
      Emitter.off(`wrong password ${type}`)
      Emitter.off(`input change`)
    }
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
    inputRef.current && inputRef.current.classList.remove('error')
  }

  const setError = () => {
    inputRef.current && inputRef.current.classList.add('error')
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