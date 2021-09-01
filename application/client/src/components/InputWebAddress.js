import { $G } from "../service/Service"

export default function InputWebAddress() {

  const handlerFocus = (e) => {
    e.target.value = ''
    $G.ACC.site = e.target.value
  }

  const handlerChange = (e) => {
    e.target.value = e.target.value.toLowerCase()
    $G.ACC.site = e.target.value
  }

  return (
    <div  className="forms_field" 
          data-tip="Please fill address of Your site...">
      {/* <label htmlFor="web">Enter Your Web Address:</label> */}
      <input  className="forms_field-input" 
              autoComplete="off"
              type="url" 
              id="web" name="web"
              placeholder="www.yoursite.com"
              required
              autoFocus
              onFocus={handlerFocus}
              onChange={handlerChange} />
    </div>
  )
}