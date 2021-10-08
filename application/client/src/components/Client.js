import { useEffect, useState } from 'react'
import { Emitter, $URL, selectedUserIdx } from '../service/Service'

export default function Client({ n, i }) {
  const [ newMsgTrigger, setNewMsgTrigger ] = useState(true)
  let user_msgs = n.msgarr.filter(n => n.msg1)
  let arr_last = user_msgs.length - 1
  
  useEffect(() => {
    Emitter.on('received message from', (data) => {
      if (data.from === n.user && selectedUserIdx !== i) {
        setNewMsgTrigger(true)
      }
    })                                  // received message from ServiceWebSocket
    return () => Emitter.off('received message from')
  }, [])

  const handlerClick = () => {
    newMsgTrigger && setNewMsgTrigger(false)
    Emitter.emit('select user', i)
    n.cnt = 0                           // reset unreaded messages counter
  }

  console.log('Client render...', n, i, selectedUserIdx)

  return (
    <div className={"clients_item " + (selectedUserIdx === i ? "client-selected" : "")} onClick={handlerClick}>
      <div className="clients_item-img">
        <div className={"clients_item-img-pulse " + (newMsgTrigger && selectedUserIdx !== i ? 'pulse' : '')}></div>
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