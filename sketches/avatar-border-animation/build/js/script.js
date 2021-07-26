/**
******************************************** AVATAR ANIMATION
*/
let delay = 100
let counter = 1, counterMax = 100
let topMargin = 80
let bottomMargin = 20
const avatar = document.querySelector('.description_form-avatar')
const avatarbg = document.querySelector('.description_form-avatarbg')
const rad = Math.PI / 180
let points = [0, 0, 0, 0]
let pointsBg = [180, 180, 180, 180]
let steps = [0, 0, 0, 0]
let stepsBg = [0, 0, 0, 0]
let ps = [0, 0, 0, 0]
let psBg = [0, 0, 0, 0]

const random = (min, max) => {
  return  min + Math.random() * (max - min)
}

const randomInteger = (min, max) => {
  // случайное число от min до (max+1)
  let rand = min + Math.random() * (max + 1 - min)
  return Math.floor(rand)
}

const getSin = (angle) => {
  return Math.sin(angle * rad)
}

const getSinValue = (angle) => {
  let dig = getSin(angle)
  offset = (topMargin - bottomMargin)/2
  return bottomMargin + offset + offset * dig
}

steps = steps.map(n => n = random(1, 6))
stepsBg = stepsBg.map(n => n = random(1, 6))

const setBrd = (item, pts) => {
  item.style.borderRadius = `
    ${pts[0]}%     ${100-pts[0]}% 
    ${pts[1]}%     ${100-pts[1]}% / 
    ${pts[2]}%     ${pts[3]}% 
    ${100-pts[3]}% ${100-pts[2]}%
    `
}

const randomStepUpdate = () => {
  let i = randomInteger(0, 4)
  let step = random(1, 6)
  steps[i] = step
  i = randomInteger(0, 4)
  step = random(1, 6)
  stepsBg[i] = step
  // console.log(steps, stepsBg)
  counter = 1
}

let intervalID = setInterval(() => {
    points = points.map((n, i) => n += steps[i])
    pointsBg = pointsBg.map((n, i) => n += stepsBg[i])
    ps = points.map(n => getSinValue(n))
    psBg = pointsBg.map(n => getSinValue(n))
    setBrd(avatar, ps)
    setBrd(avatarbg, psBg)
    counter > counterMax
      ? randomStepUpdate()
      : counter++
   }, delay)
