import { useEffect, useState } from 'react'
import { Emitter, $URL, $USR } from '../service/Service'

export default function Client(props) {
  const { prop } = props
  const { n, i, clientIndex} = prop
  const [ active, setActive ] = useState(true)
  let arr_last = n.msgarr.length - 1

  useEffect(() => {
    Emitter.on('received message from', (data) => {
      if (data.from === n.user && clientIndex !== i) {
        setActive(true)
      }
    })
  }, [])

  const handlerClick = () => {
    active && setActive(false)
    Emitter.emit('selected user', { 'index': i, 'user': $USR[i].user } )
  }

  console.log('Client render...', n, clientIndex, i, prop)

  return (
    <div className={"clients_item " + (clientIndex === i ? "client-selected" : "")} onClick={handlerClick}>
      <div className="clients_item-img">
        <div className={'clients_item-img-pulse ' + (active && clientIndex !== i ? 'pulse' : '')}></div>
        <img className="clients_item-img-img" src={`${$URL}/img/users/user${n.pict}.png`} alt=''/>
      </div>
      <div className="clients_item-status">
        <div className="clients_item-status-title">Banjo {i}</div>
        <div className="clients_item-status-desc">{n.msgarr[arr_last].msg1}</div>
      </div>
      <div className="btn_close-min"></div>
    </div>
  )
}