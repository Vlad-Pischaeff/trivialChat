import React, { useEffect } from 'react'
import { Emitter, GS } from '../service/Service'
import loginCardFlip from '../js/useCardFlip'
import HeaderLoginPage from '../components/HeaderLoginPage'
import FooterLoginPage from '../components/FooterLoginPage'
import AsidePictureSlider from '../components/AsidePictureSlider'
import Logo from '../components/Logo'
import LoginPageProfile from '../components/LoginPageProfile'
import CardLogin from '../components/CardLogin'
import CardSignup from '../components/CardSignup'

export default function LoginPage() {

  useEffect(() => {
    Emitter.on('change_title', (trigger) => loginCardFlip(trigger))
    return () => {
      Emitter.off('change_title')
    }
  }, [])

  return (
    <>
      <div className='wrap'>
        <AsidePictureSlider />

        <main className="main"> 

          <Logo />
          
          <HeaderLoginPage />
          
          <section className="main_container">
            <LoginPageProfile />
            <div className="user_forms" id="user_options-forms">
              <CardLogin />
              <CardSignup />
            </div>
          </section>
        
        </main>
      </div>
      <FooterLoginPage />
    </>
  )
}