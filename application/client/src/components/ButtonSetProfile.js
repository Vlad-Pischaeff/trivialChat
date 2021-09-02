import { $G } from "../service/Service"

export default function ButtonSetProfile() {

  const handlerClick = () => {
    console.log('ButtonSetProfile click...', $G.ACC)
  }

  return (
    <div data-tip="Check that Your profile is correct and save the changes">
      <input  className="forms_buttons-action" 
              type="button" 
              value='SAVE' 
              onClick={handlerClick} />
      </div>
  )
}