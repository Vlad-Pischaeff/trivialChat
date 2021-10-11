import { useEffect, useRef, useState } from "react"
import {$USR, useReRender, $selectedUserIdx } from "../service/Service"
import Message from "./Message"

export default function MessageList() {
  const { reRenderOnSelectUser, reRenderOnReply, reRenderOnReceivedMessage } = useReRender()
  const [ msgs, setMsgs ] = useState([])
  const msgRef = useRef('')

  useEffect(() => {
    if ($selectedUserIdx !== undefined) {
      setMsgs($USR[$selectedUserIdx].msgarr)
    }
  }, [reRenderOnSelectUser])

  useEffect(() => {
    msgRef.current && msgRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [reRenderOnReply, reRenderOnReceivedMessage, msgs]) 
  
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