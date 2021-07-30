let counter = 25
let j = 1
const delay = 4000
let images = document.querySelector('.laside')

async function sleep(timer) {
  return new Promise((res) => setTimeout(() => res(), timer))
}

const forLoop = async () => {
  while (true) {
    console.log('j', j)
    j < counter ? j++ : j = 1
    let divImg = document.createElement('div')
    divImg.className = "laside_img hide0"
    divImg.style.backgroundImage = `url(../img/img${j}.jpg)`
    images.append(divImg)
    await sleep(delay)
    let items = document.querySelectorAll('.laside_img')
    items[0].style.opacity = 0
    items[1].style.opacity = 0.85
    items[1].style.backgroundPosition = `100% 50%`
    await sleep(delay)
    items[0].remove()
  }
}

forLoop()