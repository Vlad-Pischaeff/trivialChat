const __TooltipPosition = () => {
  const tooltips = document.querySelectorAll('[data-tip]')
  let divImg = document.createElement('div')
  divImg.classList.add('tip')

  const remove = () => divImg.remove()

  tooltips.forEach(el => {

    el.removeEventListener('click', remove)

    el.onmouseenter = () => {
      divImg.dataset.text = el.dataset.tip
      document.body.append(divImg)
    }

    el.onmousemove = (e) => {
      divImg.style.left = e.clientX +'px'
      divImg.style.top = e.clientY + 'px'
    } 

    el.onmouseleave = remove
    el.addEventListener('click', remove)

  })

}

export default __TooltipPosition