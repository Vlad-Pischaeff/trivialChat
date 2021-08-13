export const avatarEffect = () => {
  const bg = document.querySelector('.profile_avatarbg')
  const avatar = document.querySelector('.profile_avatar')
  let TOP = 20, BOTTOM = 20, i = 0
  let delay = 200
  let idx = [3, 3, 3, 3], bg_idx = [3, 3, 3, 3]
  let grad = [0, 0, 0, 0], bg_grad = [180, 180, 180, 180]
  let val = [0, 0, 0, 0], bg_val = [0, 0, 0, 0]

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min
  }

  const rad = (a) => {
    return Math.sin(a * Math.PI/180)
  }

  const percent = (i) => {
    return i > 0 
      ? 50 + rad(i) * TOP 
      : 50 + rad(i) * BOTTOM
  }
  
  // console.log('avatarEffect ...', bg, avatar)

  idx = idx.map(n => getRandomArbitrary(2, 6))
  bg_idx = bg_idx.map(n => getRandomArbitrary(2, 6))

  const timerID = setInterval(() => {
    grad = grad.map((n, i) => n += idx[i])
    val = val.map((n, i) => percent(grad[i]))
    avatar.style.borderRadius = `${val[0]}% ${100 - val[0]}% ${val[1]}% ${100 - val[1]}% 
                              / ${val[2]}% ${val[3]}% ${100 - val[3]}% ${100 - val[2]}%`

    bg_grad = bg_grad.map((n, i) => n += bg_idx[i])
    bg_val = bg_val.map((n, i) => percent(bg_grad[i]))
    bg.style.borderRadius = `${bg_val[0]}% ${100 - bg_val[0]}% ${bg_val[1]}% ${100 - bg_val[1]}% 
                          / ${bg_val[2]}% ${bg_val[3]}% ${100 - bg_val[3]}% ${100 - bg_val[2]}%`
    if (i < 100) {
      i += 1
    } else {
      i = 0
      idx = idx.map(n => getRandomArbitrary(2, 6))
      bg_idx = bg_idx.map(n => getRandomArbitrary(2, 6))
    }
    // console.log(i, idx)
  }, delay)
}