import { useEffect } from "react"
import InputWebAddress from "../components/InputWebAddress"
import ButtonSetWebAddr from "../components/ButtonSetWebAddr"
import ButtonCloseStd from "../components/ButtonCloseStd"
import { $G } from '../service/Service'
import __TooltipPosition from "../js/__TooltipPosition"

export default function FirstSettingsPage() {
  $G.ACC = JSON.parse(sessionStorage.getItem('credentials'))

  useEffect(() => {
    __TooltipPosition()
  }, [])

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
              <ButtonSetWebAddr />
            </div>
            <ButtonCloseStd />
          </form>
        </section>
      </div>
    </>
  )
}