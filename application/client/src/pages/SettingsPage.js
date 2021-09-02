import { $G, $URL } from '../service/Service'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'
import InputSettingsWebAddress from '../components/InputSettingsWebAddress'
import ButtonSetProfile from '../components/ButtonSetProfile'
import InputSettingsDescription from '../components/InputSettingsDescription'
import InputSettingsTitle from '../components/InputSettingsTitle'
import InputSettingsGreeting from '../components/InputSettingsGreeting'
import __TooltipPosition from '../js/__TooltipPosition'

export default function SettingsPage() {
  const history = useHistory()

  useEffect(() => {
    __TooltipPosition()
  }, [])

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
            <div className="pos-rel" data-tip="Load new image for Your avatar...">
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
                <fieldset className="forms_fieldset">
                  <InputSettingsGreeting />
                </fieldset>
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