import { $G } from "../service/Service"
import TooltipWrap from "./TooltipWrap"

export default function ButtonSetProfile() {

  const handlerClick = (e) => {
    e.preventDefault()
    console.log('ButtonSetProfile click...', $G.ACC)
  }

  return (
    <div>
      <TooltipWrap tip="Check that Your profile is correct and save the changes...">
      <input  className="forms_buttons-action" 
              type="button" 
              value='SAVE' 
              onClick={handlerClick} />
      </TooltipWrap>
    </div>
  )
}