import Client from "./Client"
import ClientEmpty from "./ClientEmpty"
import { Emitter, randomInteger, $USR } from "../service/Service"
import { useEffect, useState } from "react"

export default function ClientList() {
  const [ clients, setClients ] = useState([])
  const [ index, setIndex ] = useState(null)

  console.log('ClientList render ...', clients, $USR)

  useEffect(() => {
    Emitter.on('received message from', (data) => {
      if (!$USR.some(n => n.user === data.from)) {
        $USR.push({'user': data.from, 'pict': randomInteger(0,23), 'msg': data.msg, 'cnt': 1, 'date': data.date})
      } else {
        $USR.forEach(n => {
          if (n.user === data.from) {
            n.cnt = n.cnt + 1
            n.msg = data.msg
          }
        })
      }
      setClients([...$USR])
      notifyMe(data.msg)
      console.log('ClientList recieved message from3...', data, $USR)
    })
    Emitter.on('selected user', (data) => {
      $USR.forEach(n => {
        if (n.user === data.user) n.cnt = 0
      })
      setClients([...$USR])
      setIndex(data.index)
    })
  }, [])

  const notifyMe = (body) => {
		var notification = new Notification ("Received new message...", {
			tag : "tchat",
			body : body,
			icon : "https://itproger.com/img/notify.png"
		})
	}

  return (
    <div className="clients">
      {
        clients.length === 0
          ? <ClientEmpty />
          : clients.map((n, i) => {
              return (
                <Client idx={i} index={index} item={n} key={i} />
              )
            })
      }
    </div>
  )
}