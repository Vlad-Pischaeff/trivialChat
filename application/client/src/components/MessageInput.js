import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/auth.hook'
import { Emitter, $URL, $G, $USR } from '../service/Service'
import { $WS } from '../service/ServiceWebSocket'
import TooltipWrap from './TooltipWrap'

export default function MessageInput() {
  const message = useAuth()
  const [ data, setData ] = useState({})

  useEffect(() => {
    Emitter.on('selected user', (data) => setData(data))
  }, [])

  const sendMessage = () => {
    if ($G.INDEX !== undefined) {
      $WS.send(JSON.stringify({ 'to': data.user, 'msg': message.value, 'date': Date.now() }))
      $USR[data.index].msgarr.push({ 'msg0':  message.value, 'date': Date.now() })
      Emitter.emit('reply to user', { 'touser': data.user, 'date': Date.now() })
    }
    message.onFocus()
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage()
  }

  // console.log('MessageInput render ...', message.value, $G.WS)

  return (
    <div className="chat_input">
      <input  className="chat_input-text" 
              name="message" 
              type="text" 
              placeholder="type your answer here ..." 
              required 
              autoFocus 
              {...message} onKeyPress={handleKeyPress} />
      <TooltipWrap tip="Press to send message...">
        <img className="chat_input-icon" src={`${$URL}/img/app/ok.png`} alt='OK' onClick={sendMessage} />
      </TooltipWrap>
      <img className="chat_input-icon" src={`${$URL}/img/app/attach.png`} alt='Attachment' />
    </div>
  )
}