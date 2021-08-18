import InputEmail from "../components/InputEmail"
import InputPassword from "../components/InputPassword"
import SettingsButton from "../components/SettingsButton"

export default function FirstSettingsPage() {

  return (
    <>
      <div className="modal_bg"></div>

      <div className='modal'>

        <section  className="modal_form" id="user-login">
          <form className="forms_form hide1" id="form_user-login">

            <h2 className="forms_title">First settings</h2>

            <fieldset className="forms_fieldset">
              <InputEmail type='login' />
              <InputPassword type='login' />
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