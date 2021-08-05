import { useRef } from "react"
import { useAuth } from "../hooks/auth.hook"
import { useFetch } from "../hooks/fetch.hook"

export default function CardSignup() {
  const email = useAuth()
  const password = useAuth()
  const { request, error } = useFetch()
  const refs = { email: useRef(), password: useRef(), msg: useRef()}
  console.log('CardSignup render ...')

  const handlerClick = async (e) => {
    e.preventDefault()
    const body = { email: email.value, password: password.value }
    try {
      const data = await request('/api/auth/register', 'POST', body)
      console.log('User registration sucsessfull ...', data, error)
    } catch(e) {
      // console.log('User register error ...', e)
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
    refs.msg.current.innerHTML = ''
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
        <div className="forms_warnings" ref={refs.msg}>
        </div>
      </form>
    </div>
  )
}