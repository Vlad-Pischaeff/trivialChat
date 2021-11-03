import { Emitter } from './ServiceEmitter'
import { randomInteger, notifyMe, httpRequest } from './ServiceHelper'

export const $USR = []
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
export let $currPage = 'LOGIN'
export let $selectedUserIdx
export let $WS

let { hostname, protocol : httpPrefix } = window.location  
let wsPrefix = httpPrefix === 'http:' ? 'ws:' : 'wss:'
export const $URL = `${httpPrefix}//${hostname}:5001`
export const $WS_URL = `${wsPrefix}//${hostname}:5001/ws`

export const $G = {
  ACC: {},
  EMAIL: '',
  PASSWORD: '',
  SEMAIL: '',
  SPASSWORD: '',
}

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

// ------------------------------------------------------------------------ On Update Authenticated User
Emitter.on('authenticated', () => $currPage = 'MAIN')

// ------------------------------------------------------------------------ On Update User Profile
Emitter.on('update user profile', async (body) => {
  if (body) {
    try {
      const data = await httpRequest(`/api/auth/user/${$G.ACC._id}`, 'PATCH', body, $G.ACC)
      if (data) {
        let newdata = { ...data, token: $G.ACC.token }
        sessionStorage.setItem('credentials', JSON.stringify(newdata))
        $G.ACC = newdata
        Emitter.emit('profile updated')
      }
    } catch(e) {
      alert('Error while update User profile ...' + e.val)
    }
  }
})

// ------------------------------------------------------------------------ On Reply To User
Emitter.on('reply to user', (data) => {
  $WS.send(JSON.stringify({ 'to': $USR[$selectedUserIdx].user, 'msg': data, 'date': Date.now() }))
  $USR[$selectedUserIdx].msgarr.push({ 'msg0': data, 'date': Date.now() })
})

// ------------------------------------------------------------------------ On Received New Message
Emitter.on('received message from', (data) => {           // received message from ServiceWebSocket
  if (!$USR.some(n => n.user === data.from)) {
    $USR.push({ 'user': data.from, 
                'pict': randomInteger(0,46), 
                'msgarr': [{ 'msg1': data.msg, 'date': data.date }], 
                'cnt': 1})
  } else {
    $USR.forEach((n, i) => {
      if (n.user === data.from) {
        if (i !== $selectedUserIdx) {
          n.cnt = n.cnt + 1
        }
        n.msgarr.push({'msg1': data.msg, 'date': data.date})
      }
    })
  }
  notifyMe(data.msg)
})

// ------------------------------------------------------------------------ On Select User
Emitter.on('select user', i => $selectedUserIdx = i)

// ------------------------------------------------------------------------ On Init Web Socket
Emitter.on('init WS', () => {
  if (!$WS) $WS = new WebSocket($WS_URL + '?userName=' + $G.ACC.email)

  $WS.onmessage = (msg) => {
    let data = JSON.parse(msg.data)
    Emitter.emit('received message from', data)
  }

  $WS.onopen = () => {
    $WS.send(JSON.stringify({ 'newManagerConnection': $G.ACC.email, 'msg': 'initial connection...', 'date': Date.now() }))
  }
})