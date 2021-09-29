import { useEffect, useState } from 'react'
import { Emitter, $URL, $USR, $G } from '../service/Service'

export default function Client({ prop }) {
  const { n, i } = prop
  const [ newMsgTrigger, setNewMsgTrigger ] = useState(true)
  let user_msgs = n.msgarr.filter(n => n.msg1)
  let arr_last = user_msgs.length - 1
  
  useEffect(() => {
    Emitter.on('received message from', (data) => {
      if (data.from === n.user && $G.INDEX !== i) {
        setNewMsgTrigger(true)
      }
    })  // received message from ServiceWebSocket
  }, [])

  const handlerClick = () => {
    newMsgTrigger && setNewMsgTrigger(false)
    Emitter.emit('selected user', { 'index': i, 'user': $USR[i].user } )
  }

  console.log('Client render...', n, $G.INDEX, i, prop)

  return (
    <div className={"clients_item " + ($G.INDEX === i ? "client-selected" : "")} onClick={handlerClick}>
      <div className="clients_item-img">
        <div className={"clients_item-img-pulse " + (newMsgTrigger && $G.INDEX !== i ? 'pulse' : '')}></div>
        <img className="clients_item-img-img" src={`${$URL}/img/users/user${n.pict}.png`} alt=''/>
      </div>
      <div className="clients_item-status">
        <div className="clients_item-status-title">Banjo {i}</div>
        <div className="clients_item-status-desc">{user_msgs[arr_last].msg1}</div>
      </div>
      <div className="btn_close-min"></div>
    </div>
  )
}