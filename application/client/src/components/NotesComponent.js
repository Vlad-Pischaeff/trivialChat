import { $G } from "../service/Service"
import NotesWrap from "./NotesWrap"

export default function NotesComponent() {
  if ($G.ACC.notes) {
    return (
      $G.ACC.notes.map((n, i) => { 
        return (
          <div className="templates_body-item" key={i} >
            <NotesWrap item={n} idx={i}/>
          </div>
        )
      })
    )
  } else {
    return (
      <div style={{margin: '.5rem'}}><p>No notes...</p></div>
    )
  }
}