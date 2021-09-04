/*
export default function __TooltipPosition() {
  const tooltips = document.querySelectorAll('[data-tip]')
  let divImg = document.createElement('div')
  divImg.classList.add('tip')
  
  let removeFn = function() {
    divImg.remove()
  }

  let enterFn = function() {
    divImg.dataset.text = this.dataset.tip
    document.body.append(divImg)
  }

  let moveFn = function(e) {
      divImg.style.left = e.clientX +'px'
      divImg.style.top = e.clientY + 'px'
  }

  tooltips.forEach(function(el){
    el.onmouseenter = enterFn
    el.onmousemove = moveFn
    el.onmouseleave = removeFn
    el.onclick = removeFn
  })
}
*/