export default function Message({ item }) {

  return (
      <div  className={item.msg1 ? 'chat_field-messagefrom': 'chat_field-messageto'}>
        <p className="msg-data">{new Date(item.date).toLocaleString()}</p>
        <p className="msg-text">{item.msg1 ? item.msg1 : item.msg0}</p>
      </div>
  )
}