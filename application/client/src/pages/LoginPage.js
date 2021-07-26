import React, { useEffect } from 'react'
import { useAnimation } from '../js/useAnimation'

export default function LoginPage() {
  const { startAnimation } = useAnimation()

  useEffect(() => {
    startAnimation()
  }, [])

  return (
    <>
    <header> 
      <p>register page</p>
    </header>
    <main className="main"> 
      <section className="logo">
        <p className="logo_text">TRIVIAL CHAT</p>
      </section>
      <section className="main_container">
        <div className="description">
          <div className="description_form">
            <h2 className="description_form-title">Don't have an account yet?</h2>
            <p className="description_form-text">Banjo tote bag bicycle rights, High Life sartorial cray craft beer whatever street art fap.</p>
            <button className="description_form-button" id="switch-button">Sign up</button>
          </div>
        </div>
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
      <aside className="city_images">
        <div className="city_images-element hide085"></div>
      </aside>
    </main>
    <footer> 
      <p>Trivial Chat 2021 &copy;</p>
    </footer>
    </>
  )
}