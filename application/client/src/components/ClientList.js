import Client from "./Client"
import ClientEmpty from "./ClientEmpty"
import { Emitter, randomInteger, $USR, $G } from "../service/Service"
import { useEffect, useState } from "react"

export default function ClientList() {
  const [ clients, setClients ] = useState([])
  const [ clientIndex, setClientIndex ] = useState(null)

  // console.log('ClientList render ...', clients, $USR)

  useEffect(() => {
    Emitter.on('received message from', (data) => {
      if (!$USR.some(n => n.user === data.from)) {
        $USR.push({ 'user': data.from, 
                    'pict': randomInteger(0,23), 
                    'msgarr': [{ 'msg1': data.msg, 'date': data.date }], 
                    'cnt': 1})
      } else {
        $USR.forEach((n, i) => {
          if (n.user === data.from) {
            if (i !== clientIndex)  n.cnt = n.cnt + 1
            n.msgarr.push({'msg1': data.msg, 'date': data.date})
          }
        })
      }
      setClients([...$USR])
      notifyMe(data.msg)
      console.log('ClientList recieved message from...', data, $USR, 'index...', clientIndex)
    })
    Emitter.on('selected user', (data) => {
      $USR.forEach(n => {
        if (n.user === data.user) n.cnt = 0
      })
      setClients([...$USR])
      setClientIndex(data.index)
      $G.INDEX = data.index
    })
  }, [])

  const notifyMe = (body) => {
		var notification = new Notification ("Received new message...", {
			header : "tchat",
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
                <Client prop={{n, i, clientIndex}} key={i} />
              )
            })
      }
    </div>
  )
}