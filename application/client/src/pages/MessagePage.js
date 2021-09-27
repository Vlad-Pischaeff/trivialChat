import { useEffect, useRef, useState } from 'react'
import ButtonCloseStd from '../components/ButtonCloseStd'
import ButtonSave from '../components/ButtonSave'

export default function MessagePage() {
  const [ msg, setMsg ] = useState(0)
  const inputRef = useRef()

  useEffect(() => {
    inputRef.current.focus()
  }, [inputRef.current])

  const handlerInput = e => {
    setMsg(e.target.innerText)
  }

  return (
    <>
      <div className="modal_bg"></div>

      <div className='modal'>

        <section  className="modal_form" id="settings">
          <form className="forms_form hide1" id="form-settings" autoComplete="off">

            <h2 className="forms_title">Send message...</h2>
            <div className="h-2rem"></div>

            <div className="forms_wrap">
              <div className="forms_fieldset" style={{ width: "100%", height: "40vh", overflow: "auto"}}>
                <p  contentEditable="true"
                    suppressContentEditableWarning="true"
                    style={{ background: "oldlace", color: "black" }} 
                    ref={inputRef}
                    onInput={handlerInput}>
                  Write Your message here...
                </p>
              </div>
            </div>
            <div className="forms_buttons">
              <ButtonSave />
            </div>
            <ButtonCloseStd />
          </form>
        </section>

      </div>
    </>
  )
}