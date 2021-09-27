import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/auth.hook'
import { Emitter, $G, $USR } from '../service/Service'
import { $WS } from '../service/ServiceWebSocket'
import TooltipWrap from './TooltipWrap'

export default function MessageInput() {
  const message = useAuth()
  const [ data, setData ] = useState({})

  useEffect(() => {
    Emitter.on('selected user', (data) => setData(data))
    return () => Emitter.off('selected user')
  }, [])

  const sendMessage = () => {
    if ($G.INDEX !== undefined && message.value !== '') {
      $WS.send(JSON.stringify({ 'to': data.user, 'msg': message.value, 'date': Date.now() }))
      $USR[data.index].msgarr.push({ 'msg0':  message.value, 'date': Date.now() })
      // Emitter.emit('reply to user', { 'touser': data.user, 'date': Date.now() })
      Emitter.emit('reply to user')
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
      <TooltipWrap className="tab" tip="Press to send message...">
        <img  className="w-icon" alt='Send message' onClick={sendMessage}
              src="data:image/png;base64,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" 
        />
      </TooltipWrap>
      {/* <TooltipWrap className="tab" tip="Press to attach file...">
        <img  className="w-icon" alt='Attachment'
              src="data:image/png;base64,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" 
        />
      </TooltipWrap> */}
    </div>
  )
}