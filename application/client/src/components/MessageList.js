import Message from "./Message"

export default function MessageList() {
  return (
    <div className="chat_field">
      {
        Array(24).fill(null).map((_, idx) => {
          return (
            <Message key={idx} idx={idx} />
          )
        })
      }
    </div>
  )
}