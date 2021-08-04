import { useCallback, useState } from "react"

export const useAuth = () => {
  const [ value, setValue ] = useState('')

  const handlerOnChange = useCallback((e) => {
    setValue(e.target.value)
  }, [])

  return { 
    value,
    onChange: handlerOnChange
  }
}