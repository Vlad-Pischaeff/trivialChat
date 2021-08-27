import { useEffect, useState } from 'react'
import { Emitter, $URL, $USR } from '../service/Service'

export default function Client(props) {
  const { index, idx, item } = props
  const [ active, setActive ] = useState(true)

  useEffect(() => {
    Emitter.on('received message from', (data) => {
      if (data.from === item.user && index !== idx) {
        setActive(true)
      }
    })
  }, [])

  const handlerClick = () => {
    active && setActive(false)
    Emitter.emit('selected user', { 'index': idx, 'user': $USR[idx].user } )
  }

  // console.log('Client render...', item, index, idx)

  return (
    <div className={"clients_item " + (index === idx ? "client-selected" : "")} onClick={handlerClick}>
      <div className="clients_item-img">
        <div className={'clients_item-img-pulse ' + (active ? 'pulse' : '')}></div>
        <img className="clients_item-img-img" src={`${$URL}/img/users/user${item.pict}.png`} alt=''/>
      </div>
      <div className="clients_item-status">
        <div className="clients_item-status-title">Banjo {idx}</div>
        <div className="clients_item-status-desc">{item.msg}</div>
      </div>
      <div className="btn_close-min"></div>
    </div>
  )
}