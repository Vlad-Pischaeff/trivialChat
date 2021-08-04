import { useAuth } from "../hooks/auth.hook"
import { useFetch } from "../hooks/fetch.hook"

export default function CardSignup() {
  const email = useAuth()
  const name = useAuth()
  const password = useAuth()
  const { request, error } = useFetch()

  const handlerClick = async () => {
    const body = { email, name, password}
    try {
      const data = await request('/api/auth/register', 'POST', body)
      console.log('User registration sucsessfull ...', data)
    } catch(e) {
      const err = e.toString().substring(7)
      const msg = JSON.parse(err)
      console.log('User register error ...', msg.errors[0], msg.errors[0].param, msg.errors[0].msg)
    }
  }

  return (
    <div className="user_forms-signup flip-180" id="user-signup">
      <form className="forms_form hide0" id="form_user-signup">
        <h2 className="forms_title">Sign Up</h2>
        <fieldset className="forms_fieldset">
          <div className="forms_field">
            <input className="forms_field-input" type="text" name="name" placeholder="Full Name" required {...name} />
          </div>
          <div className="forms_field">
            <input className="forms_field-input" type="email" name="email" placeholder="Email" required {...email} />
          </div>
          <div className="forms_field">
            <input className="forms_field-input" type="password" name="password" placeholder="Password" required {...password} />
          </div>
        </fieldset>
        <div className="forms_buttons">
          <input className="forms_buttons-action" type="submit" value="SignUp" onClick={handlerClick} />
        </div>
      </form>
    </div>
  )
}