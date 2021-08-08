import { useEffect, useState } from "react"
import  loginTitleEffect  from "../js/useTextShowUp"
import { Emitter } from "../service/Service"

export default function LoginPageProfile() {
  const [ title, setTitle ] = useState(false)

  useEffect(() => {
    loginTitleEffect(title)
    Emitter.emit('change_title', title)
  }, [title])

  return (
    <div className="description">
      <div className="description_form">
        <h2 className="description_form-title">Don't have an account yet?</h2>
        <p className="description_form-text">Banjo tote bag bicycle rights, High Life sartorial cray craft beer whatever street art fap.</p>
        <button className="description_form-button" 
                id="switch-button" 
                onClick={() => setTitle(prevVal => !prevVal)}>Sign up</button>
      </div>
    </div>
  )
}