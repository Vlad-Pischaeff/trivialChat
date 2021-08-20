import { useHistory } from "react-router-dom"

export default function SettingsButton() {
  const history = useHistory()

  const handlerClick = (e) => {
    e.preventDefault()
    history.goBack()
  }

  console.log('SettingsButton history...', history)

  return (
    <div  className="pos-rel tooltip" 
          data-text="Check that Your site name is spelled correctly and save the changes">
      <input  className="forms_buttons-action" 
              type="button" 
              value='SAVE' 
              onClick={handlerClick} />
    </div>
  )
}