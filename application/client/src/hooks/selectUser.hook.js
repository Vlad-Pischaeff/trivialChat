import { useState, useEffect } from "react"
import { Emitter } from "../service/Service"

export const useSelectUser = () => {
  const [ selectedUserIdx, setSelectedUserIdx ] = useState()

  useEffect(() => {
    Emitter.on('select user', i => {
      console.log('useSelectUser on...', i)
      setSelectedUserIdx(i)
    })
    return () => {
      console.log('useSelectUser off...')
      Emitter.off('select user')
    }
  }, [])

  return { selectedUserIdx }
}