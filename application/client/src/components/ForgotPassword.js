export default function ForgotPassword(props) {
  const { type } = props

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