export const useAnimation = () => {

  const startAnimation = () => {  
    // console.log('start animation...')
    /**
    * Variables
    */
    const signupButton = document.getElementById('switch-button')
    const FormsLogin = document.getElementById('user-login')
    const FormsSignup = document.getElementById('user-signup')
    const descriptionTitle = document.querySelector(".description_form-title")
    const userFormsLogin = document.getElementById('form_user-login')
    const userFormsSignup = document.getElementById('form_user-signup')
    let isLogin = true
    let animation = 'shadow 1s ease'

    const flip_toSignup = () => {

      FormsLogin.classList.remove('flip0')
      FormsLogin.classList.add('flip180')
      FormsSignup.classList.remove('flip-180')
      FormsSignup.classList.add('flip0')

      userFormsLogin.classList.remove('hide1')
      userFormsLogin.classList.add('hide0')
      userFormsSignup.classList.remove('hide0')
      userFormsSignup.classList.add('hide1')
      
      isLogin = false
      signupButton.innerHTML = 'Login'
      descriptionTitle.innerHTML = 'Already have an account?'
      descriptionTitle.style.animation = animation
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
      
      isLogin = true
      signupButton.innerHTML = 'Sign up'
      descriptionTitle.innerHTML = 'Don\'t have an account yet?'
      descriptionTitle.style.animation = animation
    }
    /**
    ******************************************** Add event listener to the "Sign Up" button
    */
    signupButton.addEventListener('click', () => {
      isLogin
        ? flip_toSignup()
        : flip_toLogin()
    }, false)
    /**
    ******************************************** Add event listener to the "H2" appearance animation
    */
    descriptionTitle.addEventListener('animationend', () => {
      // console.log('Animation Ended ...')
      descriptionTitle.style.animation = ''
    })
  }

  const testAnimation = () => {
    console.log('test...')
  }

  return { startAnimation, testAnimation }
}