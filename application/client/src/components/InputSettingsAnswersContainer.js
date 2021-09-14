import { useState } from "react";
import InputSettingsAnswer from "./InputSettingsAnswer";
import Message from "./Message";

export default function InputSettingsAnswersContainer() {
  const [ answer, setAnswer ] = useState(['', '', ''])
  const [ idx, setIdx ] = useState(0)

  return (
    <>
      {
        answer.map((n, i) => { 
          return (
            <div className="forms_field" key={i} onClick={() => setIdx(i)}>
              <InputSettingsAnswer message={n} idx={idx} /> 
            </div>
          )
        })
      }
      <Message item={{'msg0': answer[idx] ? answer[idx] : `Short answer ${idx} for clients...`, 'date': '2021-07-31'}} />
    </>
  )
}