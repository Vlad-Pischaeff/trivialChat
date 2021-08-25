import { useAuth } from '../hooks/auth.hook'
import { $URL, $G } from '../service/Service'

export default function MessageInput() {
  const message = useAuth()

  const sendMessage = () => {
    $G.WS.send(JSON.stringify({'from': $G.ACC.email, 'msg': message.value }))
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