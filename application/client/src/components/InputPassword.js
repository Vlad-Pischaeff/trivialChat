import { useEffect, useRef } from "react"
import { useAuth } from "../hooks/auth.hook"
import { $G, Emitter } from '../service/Service'

export default function InputPassword(props) {
  const { type } = props
  const password = useAuth()
  const inputRef = useRef()

  useEffect(() => {
    Emitter.on(`wrong password ${type}`, () => inputRef.current.classList.add('error'))
    Emitter.on('input change', () => inputRef.current && inputRef.current.classList.remove('error'))
    return () => {
      Emitter.off(`wrong password ${type}`)
      Emitter.off('input change')
    }
  }, [])

  useEffect(() => {
    $G.PASSWORD = password.value
  })

  const handlerFocus = (e) => {
    e.target.value = ''
    inputRef.current && inputRef.current.classList.remove('error')
    Emitter.emit(`clear warnings ${type}`)
  }

  console.log('input password ...', password.value, $G.PASSWORD, inputRef)

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