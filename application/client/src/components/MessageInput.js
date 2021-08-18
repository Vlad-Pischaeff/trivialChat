import { useAuth } from '../hooks/auth.hook'
import { $URL } from '../service/Service'

export default function MessageInput() {
  const message = useAuth()

  // console.log('MessageInput render ...', message.value)

  return (
    <div className="chat_input">
      <input  className="chat_input-text" 
              name="message" 
              type="text" 
              placeholder="type your answer ..." 
              required 
              autoFocus 
              {...message} />
      <img className="chat_input-icon" src={`${$URL}/img/app/ok.png`} alt='OK' />
      <img className="chat_input-icon" src={`${$URL}/img/app/attach.png`} alt='Attachment' />
    </div>
  )
}