import { useCallback } from "react"
import { $G } from '../service/Service'

export const useStorage = () => {

  const saveCredentials = useCallback((data) => {
    sessionStorage.setItem('credentials', JSON.stringify(data))
    $G.ACC = data
  }, [])

  const getCredentials = useCallback(() => {
    let data = JSON.parse(sessionStorage.getItem('credentials'))
    return data ? data : false
  }, [])

  return { saveCredentials, getCredentials }
}