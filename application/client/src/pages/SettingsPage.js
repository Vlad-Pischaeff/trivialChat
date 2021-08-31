import { $G, $URL } from '../service/Service'
import InputSettingsWebAddress from '../components/InputSettingsWebAddress'
import ButtonSetProfile from '../components/ButtonSetProfile'
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
            <div className="forms_wrap">
              <section className="forms_wrap-left">
                <div className="forms_wrap-left-flexr">
                  <div className="pos-rel tooltip h-2_5rem" data-text="Load new image fou Your avatar...">
                    <img className="forms_avatar-img" src={`${$URL}/img/app/profile2.png`} alt='' />
                  </div>
                  <div className="forms_wrap-left-flexc">
                    <fieldset className="forms_fieldset bg_lightblue">
                      <div className="forms_field">
                        <label htmlFor="title">Enter Your Title:</label>
                        <input  className="forms_field-input" 
                                autoComplete="off"
                                type="test" name="title"
                                placeholder="Title of Your company..."
                                required />
                      </div>
                    </fieldset>
                    <fieldset className="forms_fieldset bg_lightblue">
                      <div className="forms_field">
                        <label htmlFor="desc">Enter description:</label>
                        <input  className="forms_field-input" 
                                autoComplete="off"
                                type="test" name="desc"
                                placeholder="Description..."
                                required />
                      </div>
                    </fieldset>
                  </div>
                </div>
                <fieldset className="forms_fieldset bg_lightblue">  
                  <InputSettingsWebAddress />
                  {/* <InputCode /> */}
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