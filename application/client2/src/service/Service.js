import EventEmitter from 'eventemitter3'

const eventEmitter = new EventEmitter()

export const Emitter = {
  on: (event, fn) => eventEmitter.on(event, fn),
  once: (event, fn) => eventEmitter.once(event, fn),
  off: (event, fn) => eventEmitter.off(event, fn),
  emit: (event, payload) => eventEmitter.emit(event, payload)
}

export const GS = {
  page: 'login',
  slider: true
}

export const cn = {
  login: { 
    aside: 'laside',
    aside_img: 'laside_img hide085',
    logo: 'llogo',
    logo_text: 'llogo_text'
  },
  main: { 
    aside: 'maside',
    aside_img: 'maside_img',
    logo: 'mlogo',
    logo_text: 'mlogo_text'
  },
  hide0: 'hide0',
  hide1: 'hide1',
  hide085: 'hide085'
}
