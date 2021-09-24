import { useEffect, useState } from "react"
import { Emitter } from "../service/Service"

export default function SettingsTab(props) {
  // const [ idx, setIdx ] = useState(0)
  const { idx, setIdx } = props
  const tab = ['Header', 'Greeting']

  // useEffect(() => {
  //   Emitter.emit('tab selected', idx)
  // }, [idx])

  return (
    <>
      {
        tab.map((item, i) => (
          <div  className={i === idx ? "tab_front" : "tab_back"} 
                onClick={() => setIdx(i)} key={i}>
            {item}
          </div>
        ))
      }
    </>
  )
}