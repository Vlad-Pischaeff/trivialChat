const __TooltipPosition = () => {
  const tooltips = document.querySelectorAll('[data-tip]')
  let divImg = document.createElement('div')
  divImg.classList.add('tip')

  tooltips.forEach(el => {

    el.addEventListener('mouseenter', () => {
      divImg.dataset.text = el.dataset.tip
      document.body.append(divImg)
    })

    el.addEventListener('mousemove', event => {
      divImg.style.left = event.clientX +'px'
      divImg.style.top = event.clientY + 'px'
    })

    el.addEventListener('mouseleave', () => {
      divImg.remove()
    })

    el.addEventListener('click', () => {
      divImg.remove()
    })

  })

}

export default __TooltipPosition