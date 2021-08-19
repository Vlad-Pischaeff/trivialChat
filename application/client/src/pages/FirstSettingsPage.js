import InputCode from "../components/InputCode"
import InputPassword from "../components/InputPassword"
import InputSiteName from "../components/InputSiteName"
import SettingsButton from "../components/SettingsButton"
import { $G } from '../service/Service'

export default function FirstSettingsPage() {
  $G.ACC = JSON.parse(sessionStorage.getItem('credentials'))

  console.log('FirstSettingsPage ...', $G)

  return (
    <>
      <div className="modal_bg"></div>

      <div className='modal'>

        <section  className="modal_form" id="user-login">
          <form className="forms_form hide1" id="form_user-login" autoComplete="off">

            <h2 className="forms_title">First settings</h2>
            <p>{$G.ACC.email}</p>

            <fieldset className="forms_fieldset">  
              <InputSiteName />
              <InputCode />
            </fieldset>

            <div className="forms_buttons">
              <SettingsButton />
            </div>
          </form>
        </section>

      </div>
    </>
  )
}