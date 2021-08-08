import { useRef } from "react"
import { useAuth } from "../hooks/auth.hook"
import { useFetch } from "../hooks/fetch.hook"
import useStorage from "../hooks/storage.hook"

export default function CardSignup() {
  const email = useAuth(),
        password = useAuth()
  const { request, error } = useFetch()
  const refs = { email: useRef(), password: useRef(), msg: useRef() }
  const { saveCredentials } = useStorage()
  console.log('CardSignup render ...')

  const handlerClick = async (e) => {
    e.preventDefault()
    const body = { email: email.value, password: password.value }
    try {
      const data = await request('/api/auth/register', 'POST', body)
      console.log('User registration sucsessfull ...', data, error)
      saveCredentials(data)
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
    <div className="user_forms-signup flip-180" id="user-signup">
      <form className="forms_form hide0" id="form_user-signup">
        <h2 className="forms_title">Sign Up</h2>
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
          <input className="forms_buttons-action" type="submit" value="SignUp" onClick={handlerClick} />
        </div>
        <div className="forms_warnings down-error" ref={refs.msg}>
        </div>
      </form>
    </div>
  )
}