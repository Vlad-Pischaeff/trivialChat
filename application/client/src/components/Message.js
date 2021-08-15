export default function Message(props) {
  const { idx } = props

  return (
    <div key={idx} className="chat_field-message"> 
      <p className="msg-data">date 20-07-2021</p>
      <p className="msg-text">Banjo tote bag bicycle rights, High Life sartorial cray craft beer whatever street art fap</p>
    </div>
  )
}