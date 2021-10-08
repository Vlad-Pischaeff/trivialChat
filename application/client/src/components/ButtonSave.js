import { useHistory } from "react-router"
import { useFetch } from "../hooks/fetch.hook"
import { useStorage } from "../hooks/storage.hook"
import { $G } from "../service/Service"
import TooltipWrap from "./TooltipWrap"

export default function ButtonSave({ save }) {
  const history = useHistory()
  const { request } = useFetch()
  const { saveCredentials } = useStorage()

  const handlerClick = async (e) => {
    e.preventDefault()
    await updateUserProfile()
    history.goBack()
  }

  const updateUserProfile = async () => {
    const body = save.reduce((acc, n) => {
      if ($G.ACC[n]) acc[n] = $G.ACC[n]
      return acc
    }, {})

    try {
      const data = await request(`/api/auth/user/${$G.ACC._id}`, 'PATCH', body)
      let newdata = { ...data, token: $G.ACC.token }
      saveCredentials(newdata)
    } catch(e) {
      alert(`Error while update user profile... ${e.val}`)
    }
  }

  return (
    <TooltipWrap tip="Save Your settings changes...">
      <div className="forms_buttons-action" onClick={handlerClick}>SAVE</div>
    </TooltipWrap>
  )
}