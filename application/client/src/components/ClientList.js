import Client from "./Client"
import ClientEmpty from "./ClientEmpty"
import { Emitter, randomInteger } from "../service/Service"
import { useEffect, useState } from "react"
let CLT = []

export default function ClientList() {
  const [ clients, setClients ] = useState([])
  const [ index, setIndex ] = useState(null)

  console.log('ClientList render ...', clients, CLT)

  useEffect(() => {
    Emitter.on('received message from', (data) => {
      if (!CLT.some(n => n.user === data)) {
        CLT = [ ...CLT, {'user': data, 'pict': randomInteger(0,23), 'msg' : 1}]
      } else {
        CLT.forEach(n => {
          if (n.user === data) n.msg = n.msg + 1
        })
      }
      setClients(CLT)
      console.log('ClientList recieved message from...', data, CLT)
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