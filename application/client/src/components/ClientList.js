import { useEffect, useState } from "react"
import { Emitter, randomInteger, $USR, $URL, selectedUserIdx } from "../service/Service"
import Client from "./Client"
import ClientEmpty from "./ClientEmpty"

export default function ClientList() {
  const [ clients, setClients ] = useState([])

  console.log('ClientList render ...', clients, $USR, selectedUserIdx)

  useEffect(() => {
    Emitter.on('received message from', (data) => {           // received message from ServiceWebSocket
      if (!$USR.some(n => n.user === data.from)) {
        $USR.push({ 'user': data.from, 
                    'pict': randomInteger(0,46), 
                    'msgarr': [{ 'msg1': data.msg, 'date': data.date }], 
                    'cnt': 1})
      } else {
        $USR.forEach((n, i) => {
          if (n.user === data.from) {
            if (i !== selectedUserIdx)  n.cnt = n.cnt + 1
            n.msgarr.push({'msg1': data.msg, 'date': data.date})
          }
        })
      }
      setClients([...$USR])
      notifyMe(data.msg)
      console.log('ClientList recieved message from...', data, 'index...', selectedUserIdx)
    })
    return () => {
      Emitter.off('received message from')
      console.log('ClientList useEffect unmount...')
    }
  }, [])

  const notifyMe = (body) => {
		var notification = new Notification ("Received new message...", {
			title : "TCHAT: client send to You...",
			body : body,
			icon : `${$URL}/img/users/user1.png`
		})
	}

  return (
    <div className="clients">
      {
        clients.length === 0
          ? <ClientEmpty />
          : clients.map((n, i) => <Client n={n} i={i} key={i} />)
      }
    </div>
  )
}