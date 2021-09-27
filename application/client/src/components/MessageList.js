import Message from "./Message"
import { Emitter, $USR } from "../service/Service"
import { useEffect, useRef, useState } from "react"

export default function MessageList() {
  const [ msgs, setMsgs ] = useState([])
  const [ newmsg, setNewMsg] = useState()
  const msgRef = useRef('')

  useEffect(() => {
    Emitter.on('selected user', (data) => {
      // console.log('MessageList selected user...', data.index, data.user, $USR)
      setMsgs($USR[data.index].msgarr)
    })
    // Emitter.on('selected user', () => setNewMsg(Date.now()))
    Emitter.on('reply to user', reRenderComponent)
    Emitter.on('received message from', reRenderComponent) // received message from ServiceWebSocket
  }, [])

  const reRenderComponent = () => setNewMsg(Date.now())

  useEffect(() => {
    msgRef.current && msgRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [newmsg, msgs])

  return (
    <div className="chat_field">
      { 
        msgs.length === 0 
          ? <div>No messages...</div>
          : msgs.map((item, idx) => {
              return (
                <div  key={idx} 
                      className="chat_field-message"
                      data-align={item.msg1 ? 'from': 'to'} 
                      ref={msgRef} >
                  <Message item={item} />
                </div>
            )
          })
      }
    </div>
  )
}