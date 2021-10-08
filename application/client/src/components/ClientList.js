import { useClientList } from "../service/Service"
import Client from "./Client"
import ClientEmpty from "./ClientEmpty"

export default function ClientList() {
  const { clients } = useClientList()

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