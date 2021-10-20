import { $G } from "../service/Service"
import NotesWrap from "./NotesWrap"

export default function NotesComponent() {

  return (
    ($G.ACC.notes && $G.ACC.notes.length !== 0) 
      ? $G.ACC.notes.map((n, i) => (
          <div className="templates_body-item" key={i}>
            <NotesWrap item={n} idx={i}/>
          </div>
        ))
      : <div className="m-0_5rem"><p>No notes...</p></div>
  )
}