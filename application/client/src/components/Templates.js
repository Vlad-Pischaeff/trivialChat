import { useState } from "react"
import { useReRender } from "../service/Service"
import TemplatesHeader from "./TemplatesHeader"
import QuickAnswerComponent from "./QuickAnswerComponent"
import NotesComponent from "./NotesComponent"
import TemplatesFooter from "./TemplatesFooter"

export default function Templates() {
  const { reRenderOnUpdUserProfile } = useReRender()
  const [ idx, setIdx ] = useState(0)
  const body = [<QuickAnswerComponent />, <NotesComponent />]

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