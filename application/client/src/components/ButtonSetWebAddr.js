import { useHistory } from "react-router-dom"
import { useFetch } from "../hooks/fetch.hook"
import { useStorage } from "../hooks/storage.hook"
import { $G } from "../service/Service"

export default function ButtonSetWebAddr() {
  const history = useHistory()
  const { request } = useFetch()
  const { saveCredentials } = useStorage()

  const handlerClick = async (e) => {
    e.preventDefault()
    if ($G.ACC.site) {
      await updateUserSite()
      history.goBack()
    }
  }

  const updateUserSite = async () => {
    const body = { site: $G.ACC.site }
    try {
      const data = await request(`/api/auth/user/${$G.ACC._id}`, 'PATCH', body)
      let newdata = { ...data, token: $G.ACC.token }
      saveCredentials(newdata)
    } catch(e) {
      alert('Error while update site name ...', e)
    }
  }

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