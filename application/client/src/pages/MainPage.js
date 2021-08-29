import { useEffect } from "react"
import AsidePictureSlider from "../components/AsidePictureSlider"
import ClientList from "../components/ClientList"
import MessageList from "../components/MessageList"
import MessageInput from "../components/MessageInput"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Logo from "../components/Logo"
import { __Resize } from "../js/__Resize"
import Templates from "../components/Templates"
import { $G, Emitter } from '../service/Service'

export default function MainPage() {
  $G.ACC = JSON.parse(sessionStorage.getItem('credentials'))

  useEffect(() => {
    __Resize()
    Emitter.emit('init WS')
    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then(function(result) {
        console.log(result)
      })
    }
  }, [])

  // console.log('MainPage render ...')

  return (
    <>
      <div className="wrap">
        <AsidePictureSlider />
        <main className="main"> 
          <Logo />
          <Header />
          <section className="main_container">
              <ClientList />
            <div className="chat">
              <MessageList />
              <MessageInput />
              <div id="divider" draggable="true"></div>
            </div>
            <Templates />
          </section>
        </main>
      </div>
      <Footer />
    </>
  )
}