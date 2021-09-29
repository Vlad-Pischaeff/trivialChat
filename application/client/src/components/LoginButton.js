import { useHistory } from "react-router-dom"
import { useFetch } from "../hooks/fetch.hook"
import { useStorage } from "../hooks/storage.hook"
import { Emitter, $G } from "../service/Service"

export default function LoginButton({ type }) {
  const { request } = useFetch()
  const history = useHistory()
  const { saveCredentials } = useStorage()
  const url = type === 'login' ? '/api/auth/login' : '/api/auth/register'

  const handlerClick = async (e) => {
    e.preventDefault()
    const body = type === 'login' 
      ? { email: $G.EMAIL, password: $G.PASSWORD }
      : { email: $G.SEMAIL, password: $G.SPASSWORD }
    try {
      const data = await request(url, 'POST', body)
      // console.log(`LoginButton ${type} sucsessfull ...`, data)
      saveCredentials(data)
      Emitter.emit('authenticated')
      history.push('/home')
      // console.log(`User ${type} sucsessfull ...`, data, error)
    } catch(e) {
      handlingErrors(e)
    }
  }

  const handlingErrors = (e) => {
    if (e.status === 412 ) {
      Emitter.emit(`clear warnings ${type}`)
      e.val.forEach(n => {
        Emitter.emit(`wrong ${n.param} ${type}`, n.msg)
      })
    } else {
      Emitter.emit(`wrong response ${type}`, e.val)
    }
  }

  return (
    <input  className="forms_buttons-action" 
      type="submit" 
      value={type === 'login' ? 'Login' : 'Sign up'} 
      onClick={handlerClick} />
  )
}