import React, { useEffect } from 'react'
import loginCardFlip from '../js/useCardFlip'
import { Emitter } from '../service/Service'
import HeaderLoginPage from '../components/HeaderLoginPage'
import FooterLoginPage from '../components/FooterLoginPage'
import AsidePictureSlider from '../components/AsidePictureSlider'
import Logo from '../components/Logo'
import LoginPageProfile from '../components/LoginPageProfile'
import Card from '../components/Card'

export default function LoginPage() {

  useEffect(() => {
    Emitter.on('change_title', (title) => loginCardFlip(title))
    return () => {
      Emitter.off('change_title')
    }
  }, [])

  console.log('LoginPage render ...')
  
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
              <Card type="login" />
              <Card type="signup" />
            </div>
          </section>
        
        </main>
      </div>
      <FooterLoginPage />
    </>
  )
}