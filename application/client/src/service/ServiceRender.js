import { useEffect, useState } from 'react'
import { Emitter } from './ServiceEmitter'

export const useReRender = () => {
  const [ reRenderOnReply, setReRenderOnReply ] = useState()
  const [ reRenderOnReceivedMessage, setReRenderOnReceivedMessage ] = useState()
  const [ reRenderOnUpdUserProfile, setReRenderOnUpdUserProfile ] = useState()
  const [ reRenderOnSelectUser, setReRenderOnSelectUser ] = useState()

  useEffect(() => {
    Emitter.on('reply to user', () => setReRenderOnReply(Date.now()))
    Emitter.on('received message from', () => setReRenderOnReceivedMessage(Date.now()))
    Emitter.on('profile updated', () => setReRenderOnUpdUserProfile(Date.now()))
    Emitter.on('select user', () => setReRenderOnSelectUser(Date.now()))
    return () => {
      Emitter.off('reply to user')
      Emitter.off('received message from')
      Emitter.off('profile updated')
      Emitter.off('select user')
    }
  }, [])

  return { reRenderOnUpdUserProfile, reRenderOnReply, reRenderOnReceivedMessage, reRenderOnSelectUser }
}