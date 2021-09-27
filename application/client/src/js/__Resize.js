const __Resize = () => {
  const chat = document.querySelector('.chat')
  const templates = document.querySelector('.templates')
  const divider = document.getElementById('divider')
  // const chatBassis = getComputedStyle(chat, null).flexBasis.slice(0, -1)
  // const templatesBasis = getComputedStyle(templates, null).flexBasis.slice(0, -1)
  // const summ = +chatBassis + +templatesBasis
  let SummaryWidth = chat.getBoundingClientRect().width + templates.getBoundingClientRect().width
  // let min = 2

  divider.onmousedown = function(e) {
    e.preventDefault()
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)

    // divider.style.zIndex = 1
    // let shiftX = e.pageX - chat.getBoundingClientRect().right
    let chatWidth
    // console.log('mousedown...', e.pageX, chat.getBoundingClientRect(), templates.getBoundingClientRect(), SummaryWidth)
    function moveAt(pageX) {
      chatWidth = pageX - chat.getBoundingClientRect().left
      chat.style.width = chatWidth + 'px'
      templates.style.width = SummaryWidth - chatWidth + 'px' 
    }

    function onMouseMove(event) {
      moveAt(event.pageX)
    }

    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }
  }

  divider.ondragstart = function() { return false } 
}

export default __Resize