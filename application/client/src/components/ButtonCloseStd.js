import { useHistory } from "react-router-dom"

export default function ButtonCloseStd() {
  const history = useHistory()

  const handlerClose = () => {
    history.goBack()
  }

  return (
    <div className="btn_close-std" onClick={handlerClose}></div>
  )
}