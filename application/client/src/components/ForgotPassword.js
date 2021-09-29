export default function ForgotPassword({ type }) {

  const handlerClick = () => {
    console.log('Forgot password ...')
  }

  return type === 'login'
    ? (
        <button className="forms_buttons-forgot" type="button" onClick={handlerClick} >
          Forgot password?
        </button>
      )
    : <> </>
}