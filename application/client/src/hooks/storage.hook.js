import { useCallback } from "react"

export const useStorage = () => {

  const saveCredentials = useCallback((data) => {
    sessionStorage.setItem('credentials', JSON.stringify(data))
  }, [])

  const getCredentials = useCallback(() => {
    let data = JSON.parse(sessionStorage.getItem('credentials'))
    return data ? data : false
  }, [])

  return { saveCredentials, getCredentials }
}