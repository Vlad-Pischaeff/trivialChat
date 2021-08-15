import { $URL } from '../service/Service'

export default function Client(props) {
  const { idx } = props

  return (
    <div key={idx} className="clients_item">
      <div className="clients_item-img">
        <div className="clients_item-img-pulse"></div>
        <img className="clients_item-img-img" src={`${$URL}/img/users/user${idx}.png`} alt=''/>
      </div>
      <div className="clients_item-status">Banjo {idx}</div>
    </div>
  )
}