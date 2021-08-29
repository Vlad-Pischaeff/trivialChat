import Message from "./Message"
import { Emitter, $USR } from "../service/Service"
import { useEffect, useRef, useState } from "react"

export default function MessageList() {
  const [ msgs, setMsgs ] = useState([])
  const [ newmsg, setNewMsg] = useState()
  const msgRef = useRef('')

  useEffect(() => {
    Emitter.on('selected user', (data) => {
      console.log('MessageList ...', data.index, data.user, $USR)
      setMsgs($USR[data.index].msgarr)
    })
    Emitter.on('reply to user', () => setNewMsg(Date.now()))
    Emitter.on('received message from', () => setNewMsg(Date.now()))
    Emitter.on('selected user', () => setNewMsg(Date.now()))
  }, [])

  useEffect(() => {
    msgRef.current && msgRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [newmsg])

  return (
    <div className="chat_field">
      {
        msgs.map((item, idx) => {
          return (
            <div  key={idx} className="chat_field-message"
                  data-align={item.msg1 ? 'from': 'to'} ref={msgRef} >
              <Message key={idx} idx={idx} item={item}  />
            </div>
          )
        })
      }
    </div>
  )
}