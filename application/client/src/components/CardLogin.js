import { useAuth } from "../hooks/auth.hook"

export default function CardLogin() {
  const login = useAuth()
  const password = useAuth()
  
  return (
    <div className="user_forms-login flip0" id="user-login">
      <form className="forms_form hide1" id="form_user-login">
        <h2 className="forms_title">Login</h2>
        <fieldset className="forms_fieldset">
          <div className="forms_field">
            <input className="forms_field-input" type="email" placeholder="Email" required autoFocus {...login} />
          </div>
          <div className="forms_field">
            <input className="forms_field-input" type="password" placeholder="Password" required {...password} />
          </div>
        </fieldset>
        <div className="forms_buttons">
          <button className="forms_buttons-forgot" type="button">Forgot password?</button>
          <input className="forms_buttons-action" type="submit" value="LogIn" />
        </div>
      </form>
    </div>
  )
}