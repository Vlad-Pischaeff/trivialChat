import { useEffect, useState } from "react"
import { Emitter } from "../service/Service"
import TemplatesHeader from "./TemplatesHeader"
import QuickAnswerComponent from "./QuickAnswerComponent"
import NotesComponent from "./NotesComponent"
import TemplatesFooter from "./TemplatesFooter"

export default function Templates() {
  const [ upd, setUpd ] = useState()
  const [ idx, setIdx ] = useState(0)
  const body = [<QuickAnswerComponent />, <NotesComponent />]

  useEffect(() => {
    Emitter.on('update user profile', () => setUpd(Date.now()))
    return () => Emitter.off('update user profile')
  }, [])

  return (
    <aside className="templates">
      <TemplatesHeader idx={idx} setIdx={setIdx} />
      <section className="templates_body">
        <div>
          { body[idx] }
        </div>
      </section>
      <TemplatesFooter idx={idx} />
    </aside>
  )
}