import { $USR, useReRender } from "../service/Service"
import Client from "./Client"
import ClientEmpty from "./ClientEmpty"

export default function ClientList() {
  // const { clients } = useClientList()
  const { reRenderOnReceivedMessage } = useReRender()

  return (
    <div className="clients">
      {
        $USR.length === 0
          ? <ClientEmpty />
          : $USR.map((n, i) => <Client n={n} i={i} key={i} />)
      }
    </div>
  )
}