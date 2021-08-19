import { useHistory } from "react-router-dom"

export default function SettingsButton() {
  const history = useHistory()

  const handlerClick = (e) => {
    e.preventDefault()
    history.goBack()
  }

  console.log('SettingsButton history...', history)

  return (
    <input className="forms_buttons-action" 
      type="button" 
      value='OK' 
      onClick={handlerClick} />
  )
}