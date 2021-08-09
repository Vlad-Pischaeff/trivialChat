  const button = document.getElementById('switch-button')
  const FormsLogin = document.getElementById('user-login')
  const FormsSignup = document.getElementById('user-signup')
  const userFormsLogin = document.getElementById('form_user-login')
  const userFormsSignup = document.getElementById('form_user-signup')
  let trigger = false

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

/* --------------------------------text effect */

const descriptionTitle = document.querySelector(".description_form-title")
const animation = 'shadow 1s ease'

const show_toSignup = () => {
  button.innerHTML = 'Login'
  descriptionTitle.innerHTML = 'Already have an account?'
  descriptionTitle.style.animation = animation
}

const show_toLogin = () => {
  button.innerHTML = 'Sign up'
  descriptionTitle.innerHTML = 'Don\'t have an account yet?'
  descriptionTitle.style.animation = animation
}

descriptionTitle.addEventListener('animationend', () => {
  descriptionTitle.style.animation = ''
})

button.onclick = () => {
  trigger = !trigger
  if (trigger) {
    flip_toSignup()
    show_toSignup()
  } else {
    flip_toLogin()
    show_toLogin()
  }
}


