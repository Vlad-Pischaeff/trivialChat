import EventEmitter from 'eventemitter3'
import { useEffect, useState } from 'react'

const eventEmitter = new EventEmitter()

export const Emitter = {
  on: (event, fn) => eventEmitter.on(event, fn),
  once: (event, fn) => eventEmitter.once(event, fn),
  off: (event, fn) => eventEmitter.off(event, fn),
  emit: (event, payload) => eventEmitter.emit(event, payload),
  emit2: (event, payload1, payload2) => eventEmitter.emit(event, payload1, payload2),
}

const httpPrefix = window.location.protocol
let { hostname } = window.location  
let wsPrefix = httpPrefix === 'http:' ? 'ws:' : 'wss:'
export const $URL = `${httpPrefix}//${hostname}:5000`
export const $WS_URL = `${wsPrefix}//${hostname}:5000/ws`

export const $G = {
  ACC: {},
  EMAIL: '',
  PASSWORD: '',
  SEMAIL: '',
  SPASSWORD: '',
  PAGE: 'LOGIN',
  SLIDER: true
}

/*
  USR = [
    {
      "user": ... ,
      "pict": ... ,
      "msgarr": [
        {
          "msg0": ... ,         msg0 - message from admin, msg1 - message from user
          "date": ... 
        }, {}, {} ...
      ] ,
      "cnt": ...                cnt - count new unreaded messages
    }, 
    {}, {} ...
  ]
*/
export const $USR = []
// export const $MSG = {}

export const $C = {
  LOGIN: { 
    aside: 'laside',
    aside_img: 'laside_img',
    logo: 'llogo',
    logo_text: 'llogo_text'
  },
  MAIN: { 
    aside: 'maside',
    aside_img: 'maside_img',
    logo: 'mlogo',
    logo_text: 'mlogo_text'
  },
  HIDE0: 'hide0',
  HIDE1: 'hide1',
  HIDE085: 'hide085'
}

export const randomInteger = (min, max) => {
  // случайное число от min до (max+1)
  let rand = min + Math.random() * (max + 1 - min)
  return Math.floor(rand)
}

export const useReRender = () => {
  const [ reRenderOnReply, setReRenderOnReply ] = useState()
  const [ reRenderOnReceivedMessage, setReRenderOnReceivedMessage ] = useState()
  const [ reRenderOnUpdUserProfile, setReRenderOnUpdUserProfile ] = useState()
  const [ reRenderOnSelectUser, setReRenderOnSelectUser ] = useState()

  useEffect(() => {
    Emitter.on('reply to user', () => setReRenderOnReply(Date.now()))
    Emitter.on('received message from', () => setReRenderOnReceivedMessage(Date.now()))
    Emitter.on('update user profile', () => setReRenderOnUpdUserProfile(Date.now()))
    Emitter.on('select user', () => setReRenderOnSelectUser(Date.now()))
    return () => {
      Emitter.off('reply to user')
      Emitter.off('received message from')
      Emitter.off('update user profile')
      Emitter.off('select user')
    }
  }, [])

  return { reRenderOnUpdUserProfile, reRenderOnReply, reRenderOnReceivedMessage, reRenderOnSelectUser }
}

export const useClientList = () => {
  const [ clients, setClients ] = useState([])

  useEffect(() => {
    Emitter.on('received message from', (data) => {           // received message from ServiceWebSocket
      if (!$USR.some(n => n.user === data.from)) {
        $USR.push({ 'user': data.from, 
                    'pict': randomInteger(0,46), 
                    'msgarr': [{ 'msg1': data.msg, 'date': data.date }], 
                    'cnt': 1})
      } else {
        $USR.forEach((n, i) => {
          if (n.user === data.from) {
            if (i !== selectedUserIdx) {
              n.cnt = n.cnt + 1
            }
            n.msgarr.push({'msg1': data.msg, 'date': data.date})
          }
        })
      }
      setClients([...$USR])
      notifyMe(data.msg)
      // console.log('ClientList recieved message from...', data, 'index...', selectedUserIdx)
    })
    return () => Emitter.off('received message from')
  }, [])

  const notifyMe = (body) => {
		var notification = new Notification ("Received new message...", {
			title : "TCHAT: client send to You...",
			body : body,
			icon : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAADIklEQVRoge1YMYvVQBCeeHrw5H6AhdjbKdZP7GxsxEY4RA/0OuFEhAMtPLTyoYhWNoJyIGKhpYeVIlwvFmJ7z8bq0GcCSTZjkU2ySXZmd5L3tMkH7y7Jfpn5Zmdnd7MAAwYMGPA/EVANu1vn7v74Pr0TzaIlH0OIaFzr/4AA5XXVgOUfN2e0MlLHjh/dOn1/554ogDerJ9Pod7hUWJc41Yy5cQ6vjNTld98O2nRaHwIAzPZnFvFdhDWDLRlQNaFx3eb82v9DjgIyAKUUKczHqZ2DDb6AIw0gVVl/pyynGWydg0YakdbPZSCbm9N2gTc52BJp8jjQGUiVyGlXYe3epd6xg8+ASDwvDC0qmu/ZhNreM8EGYDrYeHSNNWS49OQZXMsrD64/Y3u+gDMDcmG0KJbf8o9ODgATQJaZwwGhXrndREn4rqFTgAnArAHgK8lTFN0ktV2B3ErEnzdtJUVbsjZ1qAcCy+OJVSuZAXrIzE9Umy7PBB0AaWzRomR8PgNcm8jP4rImzsCh8aR2v3r1q54xMkBEeLm2zYq68mKtxn/1/ESNmXy6CZIgOmbAcBiHgIiAgICYOYdei0/67TmN1gwwtuI41GJQi+eHXptP+O27mfMtvjiOoBgO6AoAbXzOr1sDvQ583PCLoNFTP7/s6t7Vz1Fv/HRwR06Nvcw2HMDymafCdUA0/VXcNAzzWy24FF8LVLZGdtoLeVi1clUYVb2uM1CIr4/7+UytjiKW95QKI6ZAmwY8g+jyQePbU68ffzBeQbh44zzL3568B/OD6NKtsyzfBc91gA4iSVRNkKt2kiSt6pvKsgDuABzzcSXIOABg+HGiGlwLXxCTYBayW42TtLE1Ioaevk2S1Cjwwk/3LAi3Em1RSaJKQYgAT26/JY9Rqvvi2hTfLYje2+m8BvLn3EkFdU5UT988vwdIY/Xn+elFY0QbgrjjlWqF9vFrhywAS0+1D8Dydv+FnAnAw0aPrUTevvnwgtsLN8twO1IP9PwekPRWv/mewgGqIQCcQrEl8PmB69cLe/IAAlwPEKcLFOWLvSAI1v+VswEDBgyQ4S/CMtw58cf2kAAAAABJRU5ErkJggg=='
		})
	}

  return { clients }
}



export let selectedUserIdx

Emitter.on('select user', i => selectedUserIdx = i)