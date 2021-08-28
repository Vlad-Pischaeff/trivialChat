import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/auth.hook'
import { Emitter, $URL, $G } from '../service/Service'
import { $WS } from '../service/ServiceWebSocket'

export default function MessageInput() {
  const message = useAuth()
  const [ user, setUser ] = useState(null)

  useEffect(() => {
    Emitter.on('selected user', (data) => {
      setUser(data.user)
    })
  }, [])

  const sendMessage = () => {
    // $WS.send(JSON.stringify({'from': $G.ACC.email, 'msg': message.value }))
    if ($G.INDEX !== undefined) {
      $WS.send(JSON.stringify({'to': user, 'msg': message.value, 'date': Date.now() }))
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
      <img className="chat_input-icon" src={`${$URL}/img/app/ok.png`} alt='OK' onClick={sendMessage} />
      <img className="chat_input-icon" src={`${$URL}/img/app/attach.png`} alt='Attachment' />
    </div>
  )
}