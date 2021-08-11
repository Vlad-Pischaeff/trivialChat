const chat = document.querySelector('.chat')
const templates = document.querySelector('.templates')
const divider = document.getElementById('divider')
const chatBassis = getComputedStyle(chat, null).flexBasis.slice(0, -1)
const templatesBasis = getComputedStyle(templates, null).flexBasis.slice(0, -1)
const summ = +chatBassis + +templatesBasis
let min = 2

divider.onmousedown = function(e) {
  e.preventDefault()
  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)

  divider.style.zIndex = 1000
  let shiftX = e.pageX - chat.getBoundingClientRect().right

  function moveAt(pageX) {
    let cBasis = ( (pageX - chat.getBoundingClientRect().left - shiftX) / chat.getBoundingClientRect().width ) * +getComputedStyle(chat, null).flexBasis.slice(0, -1)
    if (cBasis > min*10 && cBasis < summ - min*5) {
      chat.style.flexBasis = `${cBasis}%`
      templates.style.flexBasis = `${summ - cBasis}%`
    }
    // console.log(cBasis)
  }

  function onMouseMove(event) {
    moveAt(event.pageX)
  }

  function onMouseUp() {
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
    // console.log('mouse up...')
  }
}

divider.ondragstart = function() { return false } 