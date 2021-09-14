import { useState } from "react";
import InputSettingsAnswer from "./InputSettingsAnswer";
import Message from "./Message";
import { $G } from "../service/Service";

export default function InputSettingsAnswersContainer() {
  const [ idx, setIdx ] = useState(0)

  if (!$G.ACC.answer) {
    $G.ACC.answer = ['', '', '']
    console.log('InputSettingsAnswersContainer...IF...', $G.ACC.answer)
  }

  console.log('InputSettingsAnswersContainer...', $G.ACC.answer)

  return (
    <>
      {
        $G.ACC.answer.map((n, i) => { 
          return (
            <div className="forms_field" key={i} onClick={() => setIdx(i)}>
              <InputSettingsAnswer message={$G.ACC.answer[idx]} idx={idx} /> 
            </div>
          )
        })
      }
      <Message item={{'msg0': $G.ACC.answer[idx] ? $G.ACC.answer[idx] : `Short answer ${idx} for clients...`, 'date': '2021-07-31'}} />
    </>
  )
}