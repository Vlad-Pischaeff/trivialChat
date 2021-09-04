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
    // el.removeEventListener('mouseenter', enterFn, true)
    // el.addEventListener('mouseenter', enterFn, true)
    el.onmouseenter = enterFn
    el.onmousemove = moveFn
    // el.removeEventListener('mouseleave', removeFn, true)
    // el.addEventListener('mouseleave', removeFn, true)
    el.onmouseleave = removeFn
    // el.removeEventListener('click', removeFn, true)
    // el.addEventListener('click', removeFn, true)
    el.onclick = removeFn
  })

}