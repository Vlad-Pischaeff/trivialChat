import { gStates } from "./classNames"
const httpPrefix = window.location.protocol
// const wsPrefix = httpPrefix === 'https:' ? 'wss:' : 'ws:'
// let { host, hostname } = window.location
let { hostname } = window.location  
const URL = `${httpPrefix}//${hostname}:5000`


export const useSlider = () => {

  const slider = () => {
    let counter = 34
    let j = 1
    const delay = 4000
    const images = document.querySelector('.laside')

    async function sleep(timer) {
      return new Promise((res) => setTimeout(() => res(), timer))
    }

    const forLoop = async () => {
      while (gStates.slider) {
        j < counter ? j++ : j = 1
        let divImg = document.createElement('div')
        divImg.className = "laside_img hide0"
        divImg.style.backgroundImage = `url(${URL}/img/img${j}.jpg)`
        if (document.querySelectorAll('.laside_img').length === 1) images.append(divImg)

        await sleep(delay)

        let items = document.querySelectorAll('.laside_img')
        console.log('items ...', items.length, j, gStates.slider)
        items[0].style.opacity = 0
        items[1].style.opacity = 0.85
        items[1].style.backgroundPosition = `100% 50%`
        
        await sleep(delay)
        
        items[0].remove()
      }
    }

    forLoop()
  }

  return  { slider }
}