export default function __TooltipPosition() {
  const tooltips = document.querySelectorAll('[data-tip]')
  let divImg = document.createElement('div')
  divImg.classList.add('tip')

  function remove() {
    divImg.remove()
  }

  function mouseEnter() {
    divImg.dataset.text = this.dataset.tip
    document.body.append(divImg)
  }

  function mouseMove(e) {
      divImg.style.left = e.clientX +'px'
      divImg.style.top = e.clientY + 'px'
  }

  tooltips.forEach(function(el){
    el.onmouseenter = mouseEnter
    el.onmousemove = mouseMove
    el.onmouseleave = remove
    el.onclick = remove
  })

}