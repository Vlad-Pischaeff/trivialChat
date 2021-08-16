import { useCallback, useState } from "react"
import { Emitter } from "../service/Service"

export const useAuth = () => {
  const [ value, setValue ] = useState('')

  const handlerOnChange = useCallback((e) => { 
    Emitter.emit('input change')
    setValue(e.target.value) 
  }, [])

  return { 
    value,
    onChange: handlerOnChange
  }
}