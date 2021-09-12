import { $URL } from "../service/Service"
let timer = null
let counter = 60
let j = 1

const sleep = async (t) => {
  return new Promise((res) => timer = setTimeout(() => res(), t))
}

export default async function __AsideSlider(imgRef) {

  if (imgRef.current) {
    let divImg = document.createElement('div')
    divImg.className = "laside_img hide0"
    divImg.style.backgroundImage = `url(${$URL}/img/img${j}.jpg)`

    j = j < counter ? j + 1 : 1
    let items = imgRef.current.children

    items.length > 1 && items[0].remove()
    imgRef.current.append(divImg)

    await sleep(300)

    if (items.length > 1) {
      items[0].style.opacity = 0
      items[1].style.opacity = 0.85
      items[1].style.backgroundPosition = `100% 50%`
    } 
  }

}