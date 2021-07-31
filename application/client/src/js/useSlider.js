import { useEffect } from "react"
import { cn, GS } from "./classNames"
const httpPrefix = window.location.protocol
let { hostname } = window.location  
const URL = `${httpPrefix}//${hostname}:5000`
let timer = null
let counter = 34
let j = 1

export const useSlider = () => {

  useEffect(() => {
    if (!GS.slider) {
      clearTimeout(timer)
      let container = document.querySelector('.maside')
      let child = container.children
      let length = child.length
      for (let i = 0; i < length; i++){
        child[0].remove()
      }
      let elem = createDiv(0)
      container.append(elem)
    } else {
      let container = document.querySelector('.laside')
      let elem = createDiv(1)
      container.append(elem)
    }
  }, [GS.slider])

  async function sleep(t) {
    return new Promise((res) => timer = setTimeout(() => res(), t))
  }

  const createDiv = (index) => {
    let divImg = document.createElement('div')
    divImg.className = `${cn[GS.page].aside_img} hide0`
    if (GS.page === 'login')
      divImg.style.backgroundImage = `url(${URL}/img/img${index}.jpg)`
    return divImg
  }

  const slider = async (imgRef) => {

    while (GS.slider) {
      j < counter ? j++ : j = 1
      let items = imgRef.current.children

      if (items.length < 2) {
        let div = createDiv(j)
        imgRef.current.append(div)
      }
      
      await sleep(100)

      items[0].style.opacity = 0
      items[1].style.opacity = 0.85
      items[1].style.backgroundPosition = `100% 50%`

      await sleep(5000)
      
      items.length > 1 && items[0].remove()
    }
  }

  return  { slider }
}