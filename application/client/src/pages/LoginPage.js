import React, { useEffect } from 'react'
import loginCardFlip from '../js/useCardFlip'
import { Emitter } from '../service/Service'
import Header from '../components/Header'
import Footer from '../components/Footer'
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
          <Header />

          <section className="main_container">
            <LoginPageProfile />
            <div className="user_forms" id="user_options-forms">
              <Card type="login" />
              <Card type="signup" />
            </div>
          </section>
        
        </main>
      </div>
      <Footer />
    </>
  )
}