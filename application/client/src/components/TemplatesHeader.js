import { $URL } from "../service/Service"
import TooltipWrap from "./TooltipWrap"

export default function TemplatesHeader(props) {
  const tabs = [{ 'tip': "Quick short answers...", 'icon': `${$URL}/img/app/speaker-notes.png` },
                { 'tip': "Your notes...", 'icon': `${$URL}/img/app/note.png` },]

  const { idx, setIdx } = props

  console.log('TemplatesHeader...', idx)

  return (
    <section className="templates_header">
      {
        tabs.map((n, i) => {
          return (
            <TooltipWrap className={idx === i ? "tab tab-selected" : "tab"} position="tip-right" tip={n.tip}  key={i}>
              <img className="chat_input-icon" src={n.icon} alt='answers' onClick={() => setIdx(i)}/>
            </TooltipWrap>
          )
        })
      }
    </section>
  )
}