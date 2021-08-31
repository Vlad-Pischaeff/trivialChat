import { useHistory } from "react-router-dom"
// import InputCode from "../components/InputCode"
import InputWebAddress from "../components/InputWebAddress"
import ButtonSetWebAddr from "../components/ButtonSetWebAddr"
import { $G } from '../service/Service'

export default function FirstSettingsPage() {
  const history = useHistory()
  $G.ACC = JSON.parse(sessionStorage.getItem('credentials'))

  const handlerClose = () => {
    history.goBack()
  }

  // console.log('FirstSettingsPage ...', $G)
  
  return (
    <>
      <div className="modal_bg"></div>

      <div className='modal'>

        <section  className="modal_form" id="first-settings">
          <form className="forms_form hide1" id="form_first-settings" autoComplete="off">

            <h2 className="forms_title">First settings</h2>
            <p>{$G.ACC ? $G.ACC.email : ''}</p>

            <fieldset className="forms_fieldset">  
              <InputWebAddress />
              {/* <InputCode /> */}
            </fieldset>

            <div className="forms_buttons">
              <ButtonSetWebAddr />
            </div>
            <div className="btn_close-std" onClick={handlerClose}></div>
          </form>
        </section>

      </div>
    </>
  )
}