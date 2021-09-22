import { $G } from "../service/Service"
import NotesWrap from "./NotesWrap"

export default function NotesComponent() {
  return (
    $G.ACC.notes.map((n, i) => { 
      return (
        <div className="templates_body-item" key={i} >
          <NotesWrap item={n} idx={i}/>
        </div>
      )
    })
  )
}