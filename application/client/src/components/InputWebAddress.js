import { $G } from "../service/Service"
import TooltipWrap from "./TooltipWrap"

export default function InputWebAddress() {

  const handlerFocus = (e) => {
    e.target.value = ''
    $G.ACC.site = e.target.value
  }

  const handlerChange = (e) => {
    e.target.value = e.target.value.toLowerCase()
    $G.ACC.site = e.target.value
  }

  console.log('InputWebAddress')
  return (
    <div  className="forms_field">
      <TooltipWrap tip="Please fill address of Your site...">
      <input  className="forms_field-input" 
              autoComplete="off"
              type="url" name="url"
              placeholder="www.yoursite.com"
              required autoFocus
              onFocus={handlerFocus}
              onChange={handlerChange} />
      </TooltipWrap>
    </div>
  )
}