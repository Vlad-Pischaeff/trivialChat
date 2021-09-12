import { useHistory } from "react-router"
import { useFetch } from "../hooks/fetch.hook"
import { useStorage } from "../hooks/storage.hook"
import { $G } from "../service/Service"
import TooltipWrap from "./TooltipWrap"

export default function ButtonSetProfile(props) {
  const { save } = props
  const history = useHistory()
  const { request } = useFetch()
  const { saveCredentials } = useStorage()

  const handlerClick = async (e) => {
    e.preventDefault()
    console.log('ButtonSetProfile click...', $G.ACC, save)
    await updateUserProfile()
    history.goBack()
  }

  const updateUserProfile = async () => {
    const body = save.reduce((acc, n) => {
      if ($G.ACC[n]) acc[n] = $G.ACC[n]
      return acc
    } , {})

    try {
      const data = await request(`/api/auth/user/${$G.ACC._id}`, 'PATCH', body)
      let newdata = { ...data, token: $G.ACC.token }
      saveCredentials(newdata)
    } catch(e) {
      alert('Error while update site name ...', e)
    }
  }

  return (
    <div>
      <TooltipWrap tip="Check that Your settings is correct and save the changes...">
      <input  className="forms_buttons-action" 
              type="button" 
              value='SAVE' 
              onClick={handlerClick} />
      </TooltipWrap>
    </div>
  )
}