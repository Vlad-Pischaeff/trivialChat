import { gStates } from "./classNames"
const httpPrefix = window.location.protocol
let { hostname } = window.location  
const URL = `${httpPrefix}//${hostname}:5000`

export const useSlider = () => {
  let counter = 34
  let j = 1
  const delay = 4000

  async function sleep(timer) {
    return new Promise((res) => setTimeout(() => res(), timer))
  }

  const slider = async (imgRef) => {

    while (gStates.slider) {
      j < counter ? j++ : j = 1
      let divImg = document.createElement('div')
      divImg.className = "laside_img hide0"
      divImg.style.backgroundImage = `url(${URL}/img/img${j}.jpg)`
      if (document.querySelectorAll('.laside_img').length < 2) {
        imgRef.current.append(divImg)
      }
      
      await sleep(100)

      let items = document.querySelectorAll('.laside_img')
      if (gStates.slider) {
        console.log('items ...', items.length, j, gStates.slider)
        items[0].style.opacity = 0
        items[1].style.opacity = 0.85
        items[1].style.backgroundPosition = `100% 50%`
      }

      await sleep(delay)
      
      if (items.length > 1) items[0].remove()
    }
  }

  return  { slider }
}