import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useFetch } from "../hooks/fetch.hook"
import { useStorage } from "../hooks/storage.hook"
import { Emitter, $G } from "../service/Service"

export default function SettingsButton() {
  const history = useHistory()
  const { request } = useFetch()
  const { saveCredentials } = useStorage()
  let token = $G.ACC.token
  let site

  useEffect(() => {
    Emitter.on('web address', data => site = data)
    return () => {
      Emitter.off('web address')
    }
  }, [])

  const handlerClick = async (e) => {
    e.preventDefault()
    site && await updateUserSite()
    history.goBack()
  }

  const updateUserSite = async () => {
    const body = { site: site }
    console.log('SettingsButton ...', $G.ACC)
    try {
      const data = await request(`/api/auth/user/${$G.ACC._id}`, 'PATCH', body)
      let newdata = { ...data, token }
      saveCredentials(newdata)
      // console.log('SettingsButton received data ...', data)
    } catch(e) {
      alert('Error while update site name ...', e)
    }
  }
  
  // console.log('SettingsButton history...', $G)

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