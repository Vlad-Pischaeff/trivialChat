import { $G, $URL } from '../service/Service'
import { useHistory } from 'react-router-dom'
import InputSettingsWebAddress from '../components/InputSettingsWebAddress'
import ButtonSetProfile from '../components/ButtonSetProfile'
import InputSettingsDescription from '../components/InputSettingsDescription'
import InputSettingsTitle from '../components/InputSettingsTitle'

export default function SettingsPage() {
  const history = useHistory()

  const handlerClose = () => {
    history.goBack()
  }

  return (
    <>
      <div className="modal_bg"></div>

      <div className='modal'>

        <section  className="modal_formset" id="settings">
          <form className="forms_form hide1" id="form-settings" autoComplete="off">

            <h2 className="forms_title">Settings for {$G.ACC.email}</h2>
            <div className="h-1rem"></div>
            <div className="pos-rel tooltip h-2_5rem" data-text="Load new image fou Your avatar...">
              <img className="forms_avatar-img" src={`${$URL}/img/app/profile2.png`} alt='' />
            </div>

            <div className="forms_wrap">
              <section className="forms_wrap-left">
                <fieldset className="forms_fieldset bg_lightblue">
                  <InputSettingsTitle />
                  <InputSettingsDescription />
                  <InputSettingsWebAddress />
                </fieldset>
              </section>
              <section className="forms_wrap-right">
              </section>
            </div>
            <div className="forms_buttons">
              <ButtonSetProfile />
            </div>
            <div className="btn_close-std" onClick={handlerClose}></div>
          </form>
        </section>

      </div>
    </>
  )
}