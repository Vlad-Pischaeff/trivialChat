import { $G, $URL } from '../service/Service'
import InputSettingsWebAddress from '../components/InputSettingsWebAddress'
import SettingsButton from '../components/SettingsButton'
import { useHistory } from 'react-router-dom'

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
            <section className="forms_avatar">
              <img className="forms_avatar-img" src={`${$URL}/img/app/profile2.png`} alt='' />
            </section>
            <fieldset className="forms_fieldset">  
              <InputSettingsWebAddress />
              {/* <InputCode /> */}
            </fieldset>

            <div className="forms_buttons">
              <SettingsButton />
            </div>
            <div className="btn_close-std" onClick={handlerClose}></div>
          </form>
        </section>

      </div>
    </>
  )
}