import { useEffect, useRef } from "react"
import { $G } from "../service/Service"

export default function QuickAnswerText(props) {
  const { item, idx, edit } = props
  const inputRef = useRef()

  useEffect(() => {
    edit 
      ? inputRef.current.focus() 
      : inputRef.current.blur()
  }, [edit])

  const handlerChange = (e) => {
    $G.ACC.answer[idx] = e.target.innerText
  }

  return (
      <div className="templates_body-itemtext">
        <p  contentEditable={edit} 
            ref={inputRef} 
            suppressContentEditableWarning={true}
            onInput={handlerChange}>
          {item}
        </p>
      </div>
  )
}