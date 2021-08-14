import { useEffect, useState } from "react"
import { $C, $G, $URL } from "../service/Service"
let timer = null
let counter = 34
let j = 1

export const __AsideSlider = () => {
  const [ stopSlider, setStopSlider ] = useState(false)

  // useEffect(() => {
  //     let container = document.querySelector('aside')
  //     let child = container.children
  //     let elem = createDiv(1)
  //     if (stopSlider) {
  //       clearTimeout(timer)
  //       while(child.length) {
  //         child[0].remove()
  //       }
  //     }
  //     container.append(elem)
  // }, [stopSlider])

  const createDiv = (index) => {
    let divImg = document.createElement('div')
    divImg.className = `${$C[$G.PAGE].aside_img} hide0`
    if ($G.PAGE === 'LOGIN')
      divImg.style.backgroundImage = `url(${$URL}/img/img${index}.jpg)`
    return divImg
  }

  const sleep = async (t) => {
    return new Promise((res) => timer = setTimeout(() => res(), t))
  }

  const slider = async (imgRef) => {
    
      while (imgRef.current) {
          j < counter ? j++ : j = 1
          let items = imgRef.current.children

          if (items.length < 2) {
            let div = createDiv(j)
            imgRef.current.append(div)
          }
          
          await sleep(500)

          items[0].style.opacity = 0
          items[1].style.opacity = 0.85
          items[1].style.backgroundPosition = `100% 50%`

          await sleep(5000)
          
          items.length > 1 && items[0].remove()
      }
  }

  return  { slider, setStopSlider }
}