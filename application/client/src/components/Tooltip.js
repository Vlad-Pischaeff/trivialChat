export default function Tooltip(props) {
  const { tip } = props

  return (
    <div  className="tip" 
          data-text={tip}>
    </div>
  )
}