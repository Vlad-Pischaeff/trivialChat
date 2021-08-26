import { useState } from 'react'
import { Emitter, $URL } from '../service/Service'

export default function Client(props) {
  const { index, idx, pict } = props
  const [ active, setActive ] = useState(false)

  const handlerClick = () => {
    setActive(true)
    Emitter.emit('selected user', idx)
  }

  console.log('Client render...', index, idx)

  return (
    <div className={"clients_item " + (index === idx ? "client-selected" : "")} onClick={handlerClick}>
      <div className="clients_item-img">
        <div className={'clients_item-img-pulse ' + (active ? '' : 'pulse')}></div>
        <img className="clients_item-img-img" src={`${$URL}/img/users/user${pict}.png`} alt=''/>
      </div>
      <div className="clients_item-status">Banjo {idx}</div>
    </div>
  )
}