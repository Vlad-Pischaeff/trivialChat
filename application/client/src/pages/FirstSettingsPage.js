import InputWebAddress from "../components/InputWebAddress"
import ButtonCloseStd from "../components/ButtonCloseStd"
import ButtonSetProfile from "../components/ButtonSetProfile"
import { $G } from '../service/Service'

export default function FirstSettingsPage() {
  $G.ACC = JSON.parse(sessionStorage.getItem('credentials'))

  // console.log('FirstSettingsPage ...', $G)
  
  return (
    <>
      <div className="modal_bg"></div>

      <div className='modal'>
        <section  className="modal_form" id="first-settings">
          <form className="forms_form hide1" id="form_first-settings" autoComplete="off">

            <h2 className="forms_title">First settings for {$G.ACC ? $G.ACC.email : ''}</h2>
            <p></p>

            <fieldset className="forms_fieldset">  
              <InputWebAddress />
            </fieldset>

            <div className="forms_buttons">
              <ButtonSetProfile save={["site"]} />
            </div>
            <ButtonCloseStd />
          </form>
        </section>
      </div>
    </>
  )
}