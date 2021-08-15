import Client from "./Client"

export default function ClientList() {

  return (
    Array(24).fill(null).map((_, idx) => {
      return (
        <Client idx={idx} key={idx} />
      )
    })
  )
}