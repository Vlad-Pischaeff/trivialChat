import { Link, useLocation } from "react-router-dom"
import TooltipWrap from "./TooltipWrap"
import { $URL, $G } from "../service/Service"
import QuickAnswerWrap from "./QuickAnswerWrap"

export default function Templates() {
  const location  = useLocation()

  // console.log('Templates location...', location)

  return (
    <div className="templates">
      <div className="templates_header">
        <TooltipWrap position="tip-right" tip="Quick short answers...">
          <img className="chat_input-icon" src={`${$URL}/img/app/speaker-notes.png`} alt='answers'/>
        </TooltipWrap>
        <TooltipWrap position="tip-right" tip="Your notes...">
          <img className="chat_input-icon" src={`${$URL}/img/app/note.png`} alt='notes'/>
        </TooltipWrap>
      </div>
      <div className="templates_body">
      {
        $G.ACC.answer.map((n, i) => { 
          return (
            <div className="templates_body-item" key={i} >
              <QuickAnswerWrap item={n} />
            </div>
          )
        })
      }
      </div>
      <div className="templates_footer">
        <Link to={{ pathname: "/modaladdr", state: { background: location }}}>Modal Page</Link>
        <a href="http://localhost:5000/tchat">Client Page</a>
      </div>
    </div>
  )
}