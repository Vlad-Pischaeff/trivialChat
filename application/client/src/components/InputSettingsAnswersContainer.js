import { useEffect, useState } from "react";
import { $G, Emitter } from "../service/Service";
import InputSettingsAnswer from "./InputSettingsAnswer";
import MessageAnswer from "./MessageAnswer";

export default function InputSettingsAnswersContainer() {
  const [ idx, setIdx ] = useState(0)

  useEffect(() => {
    Emitter.emit('update answer', $G.ACC.answer[idx])
  }, [idx])

  const handlerKeyPress = (e) => {
    if (e.key === 'Tab') setIdx(prev => prev + 1)
  }

  // console.log('InputSettingsAnswersContainer...', $G.ACC.answer)

  return (
    <>
      {
        $G.ACC.answer.map((n, i) => { 
          return (
            <div className="forms_field" key={i} onClick={() => setIdx(i)} onKeyUp={handlerKeyPress}>
              <InputSettingsAnswer idx={i} /> 
            </div>
          )
        })
      }
      <MessageAnswer />
    </>
  )
}