import { $USR } from "../service/Service"
import { useReRender } from "../service/ServiceRender"
import Client from "./Client"

export default function ClientList() {
  const { reRenderOnReceivedMessage } = useReRender()

  return (
    <div className="clients">
      {
        $USR.length === 0
          ? <div className="client-empty">No clients...</div>
          : $USR.map((n, i) => <Client n={n} i={i} key={i} />)
      }
    </div>
  )
}