import { $G } from "../service/Service"
import QuickAnswerWrap from "./QuickAnswerWrap"

export default function QuickAnswerComponent() {

  return (
    ($G.ACC.answer && $G.ACC.answer.length !== 0)
      ? $G.ACC.answer.map((n, i) => (
          <div className="templates_body-item" key={i}>
            <QuickAnswerWrap item={n} idx={i}/>
          </div>
        ))
      : <div className="m-0_5rem"><p>No answers...</p></div>
  )
}