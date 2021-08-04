const loginTitleEffect = (trigger) => {
  const signupButton = document.getElementById('switch-button')
  const descriptionTitle = document.querySelector(".description_form-title")
  const animation = 'shadow 1s ease'

  const flip_toSignup = () => {
    signupButton.innerHTML = 'Login'
    descriptionTitle.innerHTML = 'Already have an account?'
    descriptionTitle.style.animation = animation
  }

  const flip_toLogin = () => {
    signupButton.innerHTML = 'Sign up'
    descriptionTitle.innerHTML = 'Don\'t have an account yet?'
    descriptionTitle.style.animation = animation
  }

  descriptionTitle.addEventListener('animationend', () => {
    descriptionTitle.style.animation = ''
  })

  trigger
    ? flip_toSignup()
    : flip_toLogin()
}

export default loginTitleEffect