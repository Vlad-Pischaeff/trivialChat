import { Link, useLocation } from "react-router-dom"
import TooltipWrap from "./TooltipWrap"
import { $URL, $G } from "../service/Service"

export default function Templates() {
  const location  = useLocation()

  // console.log('Templates location...', location)

  return (
    <div className="templates">
      <div className="templates_header">
        <TooltipWrap position="tip-right" tip="Quick short answers...">
          <img className="chat_input-icon" src={`${$URL}/img/app/note.png`} alt='Answers'/>
        </TooltipWrap>
      </div>
      <div className="templates_body">
      {
        $G.ACC.answer.map((n, i) => { 
          return (
            <TooltipWrap position="tip" tip="Click to quick answer...">
              <div className="templates_body-item" key={i} onClick={() => {}} onKeyUp={() => {}}>
                <p>{n}</p>
              </div>
            </TooltipWrap>
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