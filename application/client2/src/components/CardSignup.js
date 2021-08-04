import { useAuth } from "../hooks/auth.hook"

export default function CardSignup() {
  const email = useAuth()
  const name = useAuth()
  const password = useAuth()

  return (
    <div className="user_forms-signup flip-180" id="user-signup">
      <form className="forms_form hide0" id="form_user-signup">
        <h2 className="forms_title">Sign Up</h2>
        <fieldset className="forms_fieldset">
          <div className="forms_field">
            <input className="forms_field-input" type="text" placeholder="Full Name" required {...name} />
          </div>
          <div className="forms_field">
            <input className="forms_field-input" type="email" placeholder="Email" required {...email} />
          </div>
          <div className="forms_field">
            <input className="forms_field-input" type="password" placeholder="Password" required {...password} />
          </div>
        </fieldset>
        <div className="forms_buttons">
          <input className="forms_buttons-action" type="submit" value="SignUp" />
        </div>
      </form>
    </div>
  )
}