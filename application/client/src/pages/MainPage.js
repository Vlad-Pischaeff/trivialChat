import { useEffect } from "react"
import AsidePictureSlider from "../components/AsidePictureSlider"
import ClientList from "../components/ClientList"
import MessageList from "../components/MessageList"
import MessageInput from "../components/MessageInput"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Logo from "../components/Logo"
import { __Resize } from "../js/__Resize"

export default function MainPage() {

  useEffect(() => {
    __Resize()
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
            <div className="templates"></div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  )
}