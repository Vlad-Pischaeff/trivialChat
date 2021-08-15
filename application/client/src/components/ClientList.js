import Client from "./Client"

export default function ClientList() {

  return (
    <div className="clients">
      {
        Array(24).fill(null).map((_, idx) => {
          return (
            <Client idx={idx} key={idx} />
          )
        })
      }
    </div>
  )
}