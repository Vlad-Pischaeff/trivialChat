import { useRef, useEffect } from "react"
import { Emitter } from "../service/ServiceEmitter"

export default function WarningsField({ type }) {
  const warnRef = useRef()

  useEffect(() => {
    Emitter.on(`clear warnings ${type}`, () => setWarnings(''))
    Emitter.on(`wrong response ${type}`, (msg) => setWarnings(msg))
    Emitter.on(`wrong email ${type}`, (msg) => addWarnings(msg))
    Emitter.on(`wrong password ${type}`, (msg) => addWarnings(msg))
    return () => {
      Emitter.off(`clear warnings ${type}`)
      Emitter.off(`wrong response ${type}`)
      Emitter.off(`wrong email ${type}`)
      Emitter.off(`wrong password ${type}`)
    }
  }, [type])

  const addWarnings = (msg) => {
    if (warnRef.current)
      warnRef.current.innerHTML += `${msg} <br>`
  }

  const setWarnings = (msg) => {
    if (warnRef.current)
      warnRef.current.innerHTML = msg
  }

  // console.log(`WarningsField ${type} render ...`)

  return (
    <div className="forms_warnings down-error" ref={warnRef}></div>
  )
}