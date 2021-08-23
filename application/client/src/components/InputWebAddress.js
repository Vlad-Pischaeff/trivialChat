import { Emitter } from "../service/Service"

export default function InputWebAddress() {

  const handlerFocus = (e) => {
    e.target.value = ''
    Emitter.emit('clear web address')
  }

  const handlerChange = (e) => {
    e.target.value = e.target.value.toLowerCase()
    Emitter.emit('web address', e.target.value)
  }

  console.log('InputWebAddress render ...')

  return (
    <div className="forms_field">
      <label htmlFor="web">Enter Your Web Address:</label>
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