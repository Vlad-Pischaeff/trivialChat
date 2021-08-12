import { useRef } from "react"
import { useAuth } from "../hooks/auth.hook"
import { useFetch } from "../hooks/fetch.hook"
import { Emitter } from "../service/Service"
import { useStorage } from "../hooks/storage.hook"
import { useHistory } from 'react-router-dom'

export default function Card(props) {
  const { type } = props
  const history = useHistory()
  const email = useAuth(), password = useAuth()
  const { request, error } = useFetch()
  const refs = { email: useRef(), password: useRef(), msg: useRef() }
  const { saveCredentials } = useStorage()
  const url = type === 'login' ? '/api/auth/login' : '/api/auth/register'
    
  console.log(`Card ${type} render ...`)

  const handlerClick = async (e) => {
    e.preventDefault()
    const body = { email: email.value, password: password.value }
    try {
      const data = await request(url, 'POST', body)
      saveCredentials(data)
      console.log(`User ${type} sucsessfull ...`, data, error)
      Emitter.emit('authenticated')
      history.push('/home')
    } catch(e) {
      handlingErrors(e)
    }
  }

  const handlingErrors = (e) => {
    if (e.status === 412 ) {
      e.val.forEach(n => {
        refs[n.param].current.classList.add('error')
        addWarnings(n.msg)
      })
    } else {
      setWarnings(e.val)
    }
    refs.msg.current.focus()
  }

  const handlerFocus = (e) => {
    e.target.classList.remove('error')
    setWarnings('')
  }
  
  const addWarnings = (msg) => {
    refs.msg.current.innerHTML = refs.msg.current.innerHTML + `${msg} <br>`
  }

  const setWarnings = (msg) => {
    if (refs.msg.current) refs.msg.current.innerHTML = msg
  }

  return (
    <div  className={type === 'login' ? "user_forms-login flip0" : "user_forms-signup flip-180"} 
          id={type === 'login' ? "user-login" : "user-signup"}>
      <form className={type === 'login' ? "forms_form hide1" : "forms_form hide0"}  
            id={type === 'login' ? "form_user-login" : "form_user-signup" }>
        {
          type ==='login'
            ? <h2 className="forms_title">Login</h2>
            : <h2 className="forms_title">Sign Up</h2>
        }
        <fieldset className="forms_fieldset">
          <div className="forms_field">
            <input  className="forms_field-input" 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    required
                    autoFocus
                    {...email}
                    onFocus={handlerFocus}
                    ref={refs.email} />
          </div>
          <div className="forms_field">
            <input  className="forms_field-input" 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    required 
                    {...password} 
                    onFocus={handlerFocus}
                    ref={refs.password} />
          </div>
        </fieldset>
        <div className="forms_buttons">
          { 
            type === 'login' &&
              <button className="forms_buttons-forgot" type="button">Forgot password?</button>
          }
          <input  className="forms_buttons-action" 
                  type="submit" 
                  value={type === 'login' ? 'Login' : 'Sign up'} 
                  onClick={handlerClick} />
        </div>
        <div className="forms_warnings down-error" ref={refs.msg}>
        </div>
      </form>
    </div>
  )
}