import { useCallback, useState } from "react"

export default function useStorage() {
  const [ credentials, setCredentials ] = useState('')

  const saveCredentials = useCallback((data) => {
    sessionStorage.setItem('credentials', JSON.stringify(data))
    setCredentials(data)
  }, [])

  return { credentials, saveCredentials }
}