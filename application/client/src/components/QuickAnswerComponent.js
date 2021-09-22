import { $G } from "../service/Service"
import QuickAnswerWrap from "./QuickAnswerWrap"

export default function QuickAnswerComponent() {
  return (
    $G.ACC.answer.map((n, i) => { 
      return (
        <div className="templates_body-item" key={i} >
          <QuickAnswerWrap item={n} idx={i}/>
        </div>
      )
    })
  )
}