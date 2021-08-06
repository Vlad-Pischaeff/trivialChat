import { useRef } from "react"
import { useAuth } from "../hooks/auth.hook"
import { useFetch } from "../hooks/fetch.hook"
import useStorage from "../hooks/storage.hook"

export default function CardLogin() {
  const email = useAuth(),
        password = useAuth()
  const { request, error } = useFetch()
  const refs = { email: useRef(), password: useRef(), msg: useRef() }
  const { saveCredentials } = useStorage()

  console.log('CardLogin render ...')

  const handlerClick = async (e) => {
    e.preventDefault()
    const body = { email: email.value, password: password.value }
    try {
      const data = await request('/api/auth/login', 'POST', body)
      saveCredentials(data)
      console.log('User login sucsessfull ...', data, error)
    } catch(e) {
      console.log('User login error ...', e)
      if (e.status === 412 ) {
        e.val.forEach(n => {
          refs[n.param].current.classList.add('error')
          refs.msg.current.innerHTML = refs.msg.current.innerHTML + `${n.msg} <br>`
        })
      } else {
        refs.msg.current.innerHTML = `${e.val} <br>`
      }
      refs.msg.current.focus()
    }
  }

  const handlerFocus = (e) => {
    e.target.classList.remove('error')
    if (refs.msg.current) refs.msg.current.innerHTML = ''
  }

  return (
    <div className="user_forms-login flip0" id="user-login">
      <form className="forms_form hide1" id="form_user-login">
        <h2 className="forms_title">Login</h2>
        <fieldset className="forms_fieldset">
          <div className="forms_field">
            <input className="forms_field-input" type="email" name="email" placeholder="Email" required autoFocus {...email} onFocus={handlerFocus} ref={refs.email}/>
          </div>
          <div className="forms_field">
            <input className="forms_field-input" type="password" name="password" placeholder="Password" required {...password} onFocus={handlerFocus} ref={refs.password}/>
          </div>
        </fieldset>
        <div className="forms_buttons">
          <button className="forms_buttons-forgot" type="button">Forgot password?</button>
          <input className="forms_buttons-action" type="submit" value="LogIn" onClick={handlerClick} />
        </div>
        <div className="forms_warnings" ref={refs.msg}></div>
      </form>
    </div>
  )
}