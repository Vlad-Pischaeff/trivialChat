import { $G } from "../service/Service"
import QuickAnswerWrap from "./QuickAnswerWrap"

export default function QuickAnswerComponent() {
  if ($G.ACC.answer && $G.ACC.answer.length !== 0) {
    return (
      $G.ACC.answer.map((n, i) => { 
        return (
          <div className="templates_body-item" key={i} >
            <QuickAnswerWrap item={n} idx={i}/>
          </div>
        )
      })
    )
  } else {
    return (
      <div className="m-0_5rem"><p>No answers...</p></div>
    )
  }
}