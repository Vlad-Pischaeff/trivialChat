import { $G, Emitter } from '../service/Service'
import { useEffect, useState } from 'react'
import InputSettingsWebAddress from '../components/InputSettingsWebAddress'
import InputSettingsDescription from '../components/InputSettingsDescription'
import InputSettingsTitle from '../components/InputSettingsTitle'
import InputSettingsGreeting from '../components/InputSettingsGreeting'
// import InputSettingsAnswersContainer from '../components/InputSettingsAnswersContainer'
import InputSettingsAvatar from '../components/InputSettingsAvatar'
import ButtonCloseStd from '../components/ButtonCloseStd'
import SettingsTab from '../components/SettingsTab'
import ButtonSave from '../components/ButtonSave'

export default function SettingsPage() {
  const [ idx, setIdx ] = useState(0)
  const tab = [ <><InputSettingsTitle /><InputSettingsDescription /><InputSettingsWebAddress /></>, 
                <InputSettingsGreeting /> ]

  // useEffect(() => {
  //   Emitter.on('tab selected', (i) => setIdx(i))
  //   return () => {
  //     Emitter.off('tab selected')
  //   }
  // }, [])

  // console.log('SettingsPage...', $G.ACC)

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
                <SettingsTab idx={idx} setIdx={setIdx} />
                <fieldset className="forms_fieldsetblue">
                  {tab[idx]}
                </fieldset>
              </section>
            </div>
            <div className="forms_buttons">
              <ButtonSave save={["title", "desc", "site", "greeting"]}/>
            </div>
            <ButtonCloseStd />
          </form>
        </section>

      </div>
    </>
  )
}