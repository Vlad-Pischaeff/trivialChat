import { $G, Emitter } from "./Service"

const httpPrefix = window.location.protocol
let { hostname } = window.location  
let wsPrefix = httpPrefix === 'http:' ? 'ws:' : 'wss:'
const $WS_URL = `${wsPrefix}//${hostname}:5000/ws`

export let $WS

Emitter.on('init WS', () => {
  if (!$WS) $WS = new WebSocket($WS_URL + '?userName=' + $G.ACC.email)
  
  console.log('init WS...', $WS, $G.ACC.email)

  $WS.onmessage = (msg) => {
    let data = JSON.parse(msg.data)
    console.log('reseived message ...', data)
    Emitter.emit('received message from', data.from)
  }

})
