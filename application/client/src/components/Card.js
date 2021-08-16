import { useEffect, useRef } from "react"
import { Emitter } from "../service/Service"
import InputEmail from "./InputEmail"
import InputPassword from "./InputPassword"
import InputLogin from "./InputLogin"

export default function Card(props) {
  const { type } = props
  const loginWarnRef = useRef()
  const signupWarnRef = useRef()
    
  useEffect(() => {
    Emitter.on(`clear warnings ${type}`, () => setWarnings(''))
    Emitter.on(`wrong response ${type}`, (msg) => setWarnings(msg))
    Emitter.on(`wrong email ${type}`, (msg) => addWarnings(msg))
    Emitter.on(`wrong password ${type}`, (msg) => addWarnings(msg))
    return () => {
      Emitter.off(`clear warnings ${type}`)
      Emitter.off(`wrong response ${type}`)
      Emitter.off(`wrong email ${type}`)
      Emitter.off(`wrong password ${type}`)
    }
  })

  console.log(`Card ${type} render ...`)

  const addWarnings = (msg) => {
    if (loginWarnRef.current)
      loginWarnRef.current.innerHTML += `${msg} <br>`
    if (signupWarnRef.current)
      signupWarnRef.current.innerHTML += `${msg} <br>`
  }

  const setWarnings = (msg) => {
    if (loginWarnRef.current)
      loginWarnRef.current.innerHTML = msg
    if (signupWarnRef.current)
      signupWarnRef.current.innerHTML = msg
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
          <InputEmail type={type} />
          <InputPassword type={type} />
        </fieldset>

        <div className="forms_buttons">
          { 
            type === 'login' &&
              <button className="forms_buttons-forgot" type="button">Forgot password?</button>
          }
          <InputLogin type={type} />
        </div>
        {
          type === 'login' 
            ? <div className="forms_warnings down-error" ref={loginWarnRef}></div>
            : <div className="forms_warnings down-error" ref={signupWarnRef}></div>
        }
      </form>
    </div>
  )
}