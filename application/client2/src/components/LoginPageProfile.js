import { useState } from "react"
import  loginTitleEffect  from "../js/useTextShowUp"
import { Emitter, GS } from "../service/Service"

export default function LoginPageProfile() {
  const [ changeTitle, setChangeTitle ] = useState(false)

  const setTrigger = () => {
    let trigger = !changeTitle
    setChangeTitle(trigger)
    loginTitleEffect(trigger)
    Emitter.emit('change_title', trigger)
  }

  // console.log('LoginPageProfile render..', changeTitle)

  return (
    <div className="description">
      <div className="description_form">
        <h2 className="description_form-title">Don't have an account yet?</h2>
        <p className="description_form-text">Banjo tote bag bicycle rights, High Life sartorial cray craft beer whatever street art fap.</p>
        <button className="description_form-button" id="switch-button" onClick={setTrigger}>Sign up</button>
      </div>
    </div>
  )
}