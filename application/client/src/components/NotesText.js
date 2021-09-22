import { useEffect, useRef } from "react"
import { $G } from "../service/Service"

export default function NotesText(props) {
  const { item, idx, edit } = props
  const inputRef = useRef()

  useEffect(() => {
    edit 
      ? inputRef.current.focus() 
      : inputRef.current.blur()
  }, [edit])

  const handlerChange = (e) => {
    $G.ACC.notes[idx] = e.target.innerText
  }

  return (
      <div className="templates_body-itemtext">
        <p  contentEditable={edit} suppressContentEditableWarning={true} ref={inputRef} 
            onInput={handlerChange}>
          {item}
        </p>
      </div>
  )
}