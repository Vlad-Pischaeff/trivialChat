import TooltipWrap from "./TooltipWrap";
import { useEffect, useRef } from "react";

export default function QuickAnswerText(props) {
  const { item, edit } = props
  const inputRef = useRef()

  useEffect(() => {
    edit 
      ? inputRef.current.focus() 
      : inputRef.current.blur()
  }, [edit])

  return (
      <div className="templates_body-itemtext">
        <p contentEditable={edit} ref={inputRef} suppressContentEditableWarning={true}>{item}</p>
      </div>
  )
}