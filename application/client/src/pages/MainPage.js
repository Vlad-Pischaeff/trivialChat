import { useEffect } from "react"
import { useLocation, useHistory } from "react-router-dom"
import AsidePictureSlider from "../components/AsidePictureSlider"
import ClientList from "../components/ClientList"
import MessageList from "../components/MessageList"
import MessageInput from "../components/MessageInput"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Logo from "../components/Logo"
import Templates from "../components/Templates"
import __Resize from "../js/__Resize"
import { $G, Emitter } from '../service/Service'

export default function MainPage() {
  const history = useHistory()
  const location = useLocation()
  $G.ACC = JSON.parse(sessionStorage.getItem('credentials'))

  useEffect(() => {
    __Resize()
    Emitter.emit('init WS')
    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then(function(result) {
        console.log(result)
      })
    }
    setTimeout(() => {
      if (!$G.ACC.site || $G.ACC.site === '') {
        let loc = {
          pathname: '/modaladdr',
          state: { background: location }
        }
        history.push(loc)
      }
    }, 2000)

  }, [])

  // console.log('MainPage render ... history...', history.location.pathname)

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