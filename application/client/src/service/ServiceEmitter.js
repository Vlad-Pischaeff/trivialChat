import EventEmitter from 'eventemitter3'

const eventEmitter = new EventEmitter()

export const Emitter = {
  on: (event, fn) => eventEmitter.on(event, fn),
  once: (event, fn) => eventEmitter.once(event, fn),
  off: (event, fn) => eventEmitter.off(event, fn),
  emit: (event, payload) => eventEmitter.emit(event, payload),
  emit2: (event, payload1, payload2) => eventEmitter.emit(event, payload1, payload2),
}