let timer = null
let counter = 34
let j = 1

let container = document.querySelector('aside')

const createDiv = (index) => {
  let divImg = document.createElement('div')
  divImg.className = `laside_img hide0`
  divImg.style.backgroundImage = `url(../img/img${index}.jpg)`
  return divImg
}

const sleep = async (t) => {
  return new Promise((res) => timer = setTimeout(() => res(), t))
}

const slider = async (element) => {

  while (true) {
    j < counter ? j++ : j = 1
    let items = element.children

    if (items.length < 2) {
      let div = createDiv(j)
      element.append(div)
    }
    
    await sleep(100)

    items[0].style.opacity = 0
    items[1].style.opacity = 0.85
    items[1].style.backgroundPosition = `100% 50%`

    await sleep(5000)
    
    items.length > 1 && items[0].remove()
  }
}

slider(container)