import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { $G, Emitter } from "../service/Service"
// import TooltipWrap from "./TooltipWrap"
import TemplatesHeader from "./TemplatesHeader"
import QuickAnswerComponent from "./QuickAnswerComponent"
import NotesComponent from "./NotesComponent"
import TemplatesFooter from "./TemplatesFooter"

export default function Templates() {
  const location  = useLocation()
  // const [ msg, setMsg ] = useState(0)
  const [ upd, setUpd ] = useState()
  const [ idx, setIdx ] = useState(0)
  const body = [<QuickAnswerComponent />, <NotesComponent />]
  // const emit = [() => Emitter.emit('add new answer', $G.ACC.answer.length - 1),
  //               () => Emitter.emit('add new note', $G.ACC.notes.length - 1)]
  // const pushMsg = [ () => $G.ACC.answer.push('answer...'), 
  //                   () => $G.ACC.notes.push('new note...')]

  useEffect(() => {
    Emitter.on('update user profile', () => setUpd(Date.now()))
    // Emitter.on('templates tab selected', data => setIdx(data))
    return () => {
      Emitter.off('update user profile')
      // Emitter.off('templates tab selected')
    }
  }, [])

  // useEffect(() => {
  //   msg !== 0 &&  emit[idx]()
  // }, [msg])

  // const addNewMsg = () => {
  //   pushMsg[idx]()
  //   setMsg(prev => prev + 1)
  // }

  return (
    <aside className="templates">
      <TemplatesHeader idx={idx} setIdx={setIdx} />
      <section className="templates_body">
        <div>
          { body[idx] }
        </div>
      </section>
      <TemplatesFooter idx={idx} />
      {/* <section className="templates_footer">
        <Link to={{ pathname: "/modaladdr", state: { background: location }}}>Modal Page</Link>
        <a href="http://localhost:5000/tchat">Client Page</a>
        <TooltipWrap position="tip" tip="Add new quick answer...">
          <img  className="b-icon" alt="add new answer"
                src="data:image/png;base64,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"
                onClick={addNewMsg} />
        </TooltipWrap>
      </section> */}
    </aside>
  )
}