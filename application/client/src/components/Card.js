import InputEmail from "./InputEmail"
import InputPassword from "./InputPassword"
import LoginButton from "./LoginButton"
import ForgotPassword from "./ForgotPassword"
import WarningsField from "./WarningsField"

export default function Card(props) {
  const { type } = props

  console.log(`Card ${type} render ...`)

  return (
    <div  className={type === 'login' ? "user_forms-login flip0" : "user_forms-signup flip-180"} 
          id={type === 'login' ? "user-login" : "user-signup"}>
      <form className={type === 'login' ? "forms_form hide1" : "forms_form hide0"}  
            id={type === 'login' ? "form_user-login" : "form_user-signup"}
            autoComplete="off" >

        <h2 className="forms_title">{type ==='login' ? 'Login' : 'Sign Up'}</h2>
        <p></p>
        <fieldset className="forms_fieldset">
          <InputEmail type={type} />
          <InputPassword type={type} />
        </fieldset>

        <div className="forms_buttons">
          <ForgotPassword type={type} />
          <LoginButton type={type} />
        </div>
          <WarningsField type={type} />
      </form>
    </div>
  )
}