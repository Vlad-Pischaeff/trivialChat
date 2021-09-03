import { $G, Emitter } from '../service/Service'
import { useEffect, useState } from 'react'
import InputSettingsWebAddress from '../components/InputSettingsWebAddress'
import ButtonSetProfile from '../components/ButtonSetProfile'
import InputSettingsDescription from '../components/InputSettingsDescription'
import InputSettingsTitle from '../components/InputSettingsTitle'
import InputSettingsGreeting from '../components/InputSettingsGreeting'
import InputSettingsAvatar from '../components/InputSettingsAvatar'
import ButtonCloseStd from '../components/ButtonCloseStd'
import SettingsTab from '../components/SettingsTab'
import __TooltipPosition from '../js/__TooltipPosition'

export default function SettingsPage() {
  const [ idx, setIdx ] = useState(0)

  useEffect(() => {
    __TooltipPosition()
    Emitter.on('tab selected', (i) => setIdx(i))
    return () => {
      Emitter.off('tab selected')
    }
  }, [])

  return (
    <>
      <div className="modal_bg"></div>

      <div className='modal'>

        <section  className="modal_form" id="settings">
          <form className="forms_form hide1" id="form-settings" autoComplete="off">

            <h2 className="forms_title">Settings for {$G.ACC.email}</h2>
            <div className="h-1rem"></div>

            <div className="forms_wrap">
              <section className="forms_wrap-left" >
                <InputSettingsAvatar />
              </section>
              <section className="forms_wrap-right">
                <SettingsTab />
                <fieldset className="forms_fieldsetblue">
                  {
                    idx === 0 &&
                      <>
                        <InputSettingsTitle />
                        <InputSettingsDescription />
                        <InputSettingsWebAddress />
                      </>
                  }
                  {
                    idx === 1 &&
                        <InputSettingsGreeting />
                  }
                </fieldset>
              </section>
            </div>
            <div className="forms_buttons">
              <ButtonSetProfile />
            </div>
            <ButtonCloseStd />
          </form>
        </section>

      </div>
    </>
  )
}