import { useHistory } from "react-router"
import { $G, Emitter } from "../service/Service"
import TooltipWrap from "./TooltipWrap"

export default function ButtonSave({ save }) {
  const history = useHistory()

  const handlerClick = e => {
    e.preventDefault()
    updateUserProfile()
    history.goBack()
  }

  const updateUserProfile = () => {
    const body = save.reduce((acc, n) => {
      if ($G.ACC[n]) acc[n] = $G.ACC[n]
      return acc
    }, {})
    Emitter.emit('update user profile', body)
  }

  return (
    <TooltipWrap tip="Save Your settings changes...">
      <div className="forms_buttons-action" onClick={handlerClick}>SAVE</div>
    </TooltipWrap>
  )
}