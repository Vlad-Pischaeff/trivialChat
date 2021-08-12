import { useCallback, useState } from "react"

export default function useStorage() {
  const [ credentials, setCredentials ] = useState('') /* Probably not needed later */

  const saveCredentials = useCallback((data) => {
    sessionStorage.setItem('credentials', JSON.stringify(data))
    setCredentials(data)                              /* Probably not needed later */
  }, [])

  const getCredentials = useCallback(() => JSON.parse(sessionStorage.getItem('credentials')), [])

  return { credentials, saveCredentials, getCredentials }
}