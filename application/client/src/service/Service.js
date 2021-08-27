import EventEmitter from 'eventemitter3'

const eventEmitter = new EventEmitter()

export const Emitter = {
  on: (event, fn) => eventEmitter.on(event, fn),
  once: (event, fn) => eventEmitter.once(event, fn),
  off: (event, fn) => eventEmitter.off(event, fn),
  emit: (event, payload) => eventEmitter.emit(event, payload)
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
  SLIDER: true,
}

export const $USR = []
export const $MSG = {}

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