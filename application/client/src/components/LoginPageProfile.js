import { useEffect } from "react"
import { useTextShowUp } from "../js/useTextShowUp"
import { GS } from "../js/classNames"

export default function LoginPageProfile(props) {
  const { letSwitch, setSwitch } = props
  const { startShowUp } = useTextShowUp()

  useEffect(() => {
    startShowUp(letSwitch)
  }, [startShowUp])

  const setTrigger = () => {
    setSwitch(!letSwitch)
    GS.page = letSwitch ? 'login' : 'main'
    GS.slider = letSwitch ? true : false
  }

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