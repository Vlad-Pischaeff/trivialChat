export default function ForgotPassword() {

  const handlerClick = () => {
    console.log('Forgot password ...')
  }

  return (
    <button className="forms_buttons-forgot" type="button" onClick={handlerClick} >
      Forgot password?
    </button>
  )
}