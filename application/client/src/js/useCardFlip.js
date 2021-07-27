export const useCardFlip = () => {
  
  const startFlip = (trigger) => {
    const FormsLogin = document.getElementById('user-login')
    const FormsSignup = document.getElementById('user-signup')
    const userFormsLogin = document.getElementById('form_user-login')
    const userFormsSignup = document.getElementById('form_user-signup')

    const flip_toSignup = () => {
      FormsLogin.classList.remove('flip0')
      FormsLogin.classList.add('flip180')
      FormsSignup.classList.remove('flip-180')
      FormsSignup.classList.add('flip0')

      userFormsLogin.classList.remove('hide1')
      userFormsLogin.classList.add('hide0')
      userFormsSignup.classList.remove('hide0')
      userFormsSignup.classList.add('hide1')
    }

    const flip_toLogin = () => {
      FormsLogin.classList.remove('flip180')
      FormsLogin.classList.add('flip0')
      FormsSignup.classList.remove('flip0')
      FormsSignup.classList.add('flip-180')

      userFormsLogin.classList.remove('hide0')
      userFormsLogin.classList.add('hide1')
      userFormsSignup.classList.remove('hide1')
      userFormsSignup.classList.add('hide0')
    }
    
    trigger
      ? flip_toSignup()
      : flip_toLogin()
  }

  return { startFlip }
}