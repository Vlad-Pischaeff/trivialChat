import { useEffect, useState } from "react"
import { Emitter } from "../service/Service"

export default function MessageAnswer() {
  const [ msg, setMsg ] = useState()

  useEffect(() => {
    Emitter.on('update answer', data => setMsg(data))
    return () => Emitter.off('update answer')
  }, [])

  return (
    <div  className='chat_field-messageto'>
      <p className="msg-data">{new Date('2021-01-01').toLocaleString()}</p>
      <p className="msg-text">{msg ? msg : 'Short answer for clients...'}</p>
    </div>
  )
}