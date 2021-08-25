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
import { $G, $WS_URL } from '../service/Service'

export default function MainPage() {
  $G.ACC = JSON.parse(sessionStorage.getItem('credentials'))

  useEffect(() => {
    __Resize()
    $G.WS = new WebSocket($WS_URL + '?userName=' + $G.ACC.email) 
    $G.WS.onmessage = (msg) => console.log('reseived message ...', JSON.parse(msg.data))
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