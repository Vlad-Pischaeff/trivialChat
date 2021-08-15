import { useEffect } from "react"
import AsidePictureSlider from "../components/AsidePictureSlider"
import ClientList from "../components/ClientList"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Logo from "../components/Logo"
import { __Resize } from "../js/__Resize"
import { $URL } from '../service/Service'

export default function MainPage() {

  useEffect(() => {
    __Resize()
  }, [])

  console.log('MainPage render ...')

  return (
    <>
      <div className="wrap">
        <AsidePictureSlider />
        <main className="main"> 
          <Logo />
          <Header />
          <section className="main_container">

            <div className="clients">
              <ClientList />
            </div>

            <div className="chat">
              <div className="chat_field">

              {
                Array(24).fill(null).map((_, i) => {
                  return (
                    <div key={i} className="chat_field-message"> 
                      <p className="msg-data">date 20-07-2021</p>
                      <p className="msg-text">Banjo tote bag bicycle rights, High Life sartorial cray craft beer whatever street art fap</p>
                    </div>
                  )
                })
              }

              </div>
              <div className="chat_input">
                <input className="chat_input-text" type="text" placeholder="type your answer ..." required autoFocus/>
                <img className="chat_input-icon" src={`${$URL}/img/app/ok.png`} alt='OK' />
                <img className="chat_input-icon" src={`${$URL}/img/app/attach.png`} alt='Attachment' />
              </div>
              <div id="divider" draggable="true"></div>
            </div>
            
            <div className="templates"></div>
          </section>
        </main>
      </div>
    <Footer />
  </>
  )
}