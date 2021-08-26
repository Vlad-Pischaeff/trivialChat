import Client from "./Client"
import ClientEmpty from "./ClientEmpty"
import { Emitter, randomInteger } from "../service/Service"
import { useEffect, useState } from "react"

export default function ClientList() {
  const [ clients, setClients ] = useState([])
  const [ index, setIndex ] = useState(null)

  console.log('ClientList render ...', clients)

  useEffect(() => {
    Emitter.on('received message from', (data) => {
      let arr = [...clients]
      arr.forEach(el => console.log('forEach...',el))
      setClients((clients) => [...clients, {'user': data, 'pict': randomInteger(0,23), 'msg' : 1}])

      console.log('ClientList recieved message from...', data)
    })
    Emitter.on('selected user', (data) => {
      setIndex(data)
    })
  }, [])

  return (
    <div className="clients">
      {
        clients.length === 0
          ? <ClientEmpty />
          : clients.map((n, i) => {
              return (
                <Client idx={i} index={index} pict={n.pict} key={i} />
              )
            })
      }
    </div>
  )
}