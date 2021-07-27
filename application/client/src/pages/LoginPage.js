import React, { useEffect, useState } from 'react'
import { useCardFlip } from '../js/useCardFlip'
import HeaderLoginPage from '../components/HeaderLoginPage'
import FooterLoginPage from '../components/FooterLoginPage'
import AsidePictureSlider from '../components/AsidePictureSlider'
import Logo from '../components/Logo'
import LoginPageProfile from '../components/LoginPageProfile'

export default function LoginPage() {
  const { startFlip } = useCardFlip()
  const [ letSwitchToSignup, setLetSwitshToSignup ] = useState(false)

  useEffect(() => {
    startFlip(letSwitchToSignup)
  }, [letSwitchToSignup, startFlip])
  
  return (
    <>
    <HeaderLoginPage />
    <main className="main"> 
      <Logo />
      <section className="main_container">
        <LoginPageProfile letSwitch={letSwitchToSignup} setSwitch={setLetSwitshToSignup} />
        <div className="user_forms" id="user_options-forms">
          <div className="user_forms-login flip0" id="user-login">
            <form className="forms_form hide1" id="form_user-login">
              <h2 className="forms_title">Login</h2>
              <fieldset className="forms_fieldset">
                <div className="forms_field">
                  <input className="forms_field-input" type="email" placeholder="Email" required autoFocus />
                </div>
                <div className="forms_field">
                  <input className="forms_field-input" type="password" placeholder="Password" required />
                </div>
              </fieldset>
              <div className="forms_buttons">
                <button className="forms_buttons-forgot" type="button">Forgot password?</button>
                <input className="forms_buttons-action" type="submit" value="LogIn" />
              </div>
            </form>
          </div>
          <div className="user_forms-signup flip-180" id="user-signup">
            <form className="forms_form hide0" id="form_user-signup">
              <h2 className="forms_title">Sign Up</h2>
              <fieldset className="forms_fieldset">
                <div className="forms_field">
                  <input className="forms_field-input" type="text" placeholder="Full Name" required />
                </div>
                <div className="forms_field">
                  <input className="forms_field-input" type="email" placeholder="Email" required />
                </div>
                <div className="forms_field">
                  <input className="forms_field-input" type="password" placeholder="Password" required />
                </div>
              </fieldset>
              <div className="forms_buttons">
                <input className="forms_buttons-action" type="submit" value="SignUp" />
              </div>
            </form>
          </div>
        </div>
      </section>
      <AsidePictureSlider />
    </main>
    <FooterLoginPage />
    </>
  )
}