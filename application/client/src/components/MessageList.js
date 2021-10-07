import { useEffect, useRef, useState } from "react"
import { Emitter, $USR, selectedUserIdx } from "../service/Service"
import { useReRender } from "../service/Service"
import Message from "./Message"

export default function MessageList() {
  const { reRender } = useReRender()
  const [ msgs, setMsgs ] = useState([])
  const [ newmsg, setNewMsg] = useState()
  const msgRef = useRef('')

  useEffect(() => {
    Emitter.on('reply to user', reRenderComponent)
    Emitter.on('received message from', reRenderComponent) // received message from ServiceWebSocket
    return () => {
      Emitter.off('reply to user')
      Emitter.off('received message from')
    }
  }, [])

  useEffect(() => {
    if (selectedUserIdx !== undefined) {
      setMsgs($USR[selectedUserIdx].msgarr)
    }
  }, [selectedUserIdx])

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