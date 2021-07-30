import React, { useEffect, useState } from 'react'
import { useCardFlip } from '../js/useCardFlip'
import HeaderLoginPage from '../components/HeaderLoginPage'
import FooterLoginPage from '../components/FooterLoginPage'
import AsidePictureSlider from '../components/AsidePictureSlider'
import Logo from '../components/Logo'
import LoginPageProfile from '../components/LoginPageProfile'
import CardLogin from '../components/CardLogin'
import CardSignup from '../components/CardSignup'

export default function LoginPage() {
  const { startFlip } = useCardFlip()
  const [ letSwitchToSignup, setLetSwitshToSignup ] = useState(false)

  useEffect(() => {
    startFlip(letSwitchToSignup)
  }, [letSwitchToSignup])
  
  return (
    <>
      <div className='wrap'>
        <AsidePictureSlider />

        <main className="main"> 

          <Logo />
          
          <HeaderLoginPage />
          
          <section className="main_container">
            <LoginPageProfile letSwitch={letSwitchToSignup} setSwitch={setLetSwitshToSignup} />
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