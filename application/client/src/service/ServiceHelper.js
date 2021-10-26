import { $G } from "./Service"
import { Emitter } from "./ServiceEmitter"

export const randomInteger = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min)
  return Math.floor(rand)
}

export const httpRequest = async (url, method = 'GET', body = null) => {
  try {
    body = body ? JSON.stringify(body) : null
    const headers = { 'Content-Type': 'application/json', 
                    ...( $G.ACC && $G.ACC.token && { Authorization: $G.ACC.token } )
                    }
    const response = await fetch(url, {method, body, headers})
    const data = await response.json()
    if (!response.ok) {
      alert(data.message) 
    }
    return data
  } catch (e) {
    throw e
  }
}

export const updateUserProfile = async (body) => {
  try {
    const data = await httpRequest(`/api/auth/user/${$G.ACC._id}`, 'PATCH', body)
    let newdata = { ...data, token: $G.ACC.token }
    sessionStorage.setItem('credentials', JSON.stringify(newdata))
    $G.ACC = newdata
    Emitter.emit('profile updated')
  } catch(e) {
    alert('Error while update User profile ...' + e.val)
  }
}

export const notifyMe = (body) => {
  var notification = new Notification ("Received new message...", {
    body : body,
    icon : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAADIklEQVRoge1YMYvVQBCeeHrw5H6AhdjbKdZP7GxsxEY4RA/0OuFEhAMtPLTyoYhWNoJyIGKhpYeVIlwvFmJ7z8bq0GcCSTZjkU2ySXZmd5L3tMkH7y7Jfpn5Zmdnd7MAAwYMGPA/EVANu1vn7v74Pr0TzaIlH0OIaFzr/4AA5XXVgOUfN2e0MlLHjh/dOn1/554ogDerJ9Pod7hUWJc41Yy5cQ6vjNTld98O2nRaHwIAzPZnFvFdhDWDLRlQNaFx3eb82v9DjgIyAKUUKczHqZ2DDb6AIw0gVVl/pyynGWydg0YakdbPZSCbm9N2gTc52BJp8jjQGUiVyGlXYe3epd6xg8+ASDwvDC0qmu/ZhNreM8EGYDrYeHSNNWS49OQZXMsrD64/Y3u+gDMDcmG0KJbf8o9ODgATQJaZwwGhXrndREn4rqFTgAnArAHgK8lTFN0ktV2B3ErEnzdtJUVbsjZ1qAcCy+OJVSuZAXrIzE9Umy7PBB0AaWzRomR8PgNcm8jP4rImzsCh8aR2v3r1q54xMkBEeLm2zYq68mKtxn/1/ESNmXy6CZIgOmbAcBiHgIiAgICYOYdei0/67TmN1gwwtuI41GJQi+eHXptP+O27mfMtvjiOoBgO6AoAbXzOr1sDvQ583PCLoNFTP7/s6t7Vz1Fv/HRwR06Nvcw2HMDymafCdUA0/VXcNAzzWy24FF8LVLZGdtoLeVi1clUYVb2uM1CIr4/7+UytjiKW95QKI6ZAmwY8g+jyQePbU68ffzBeQbh44zzL3568B/OD6NKtsyzfBc91gA4iSVRNkKt2kiSt6pvKsgDuABzzcSXIOABg+HGiGlwLXxCTYBayW42TtLE1Ioaevk2S1Cjwwk/3LAi3Em1RSaJKQYgAT26/JY9Rqvvi2hTfLYje2+m8BvLn3EkFdU5UT988vwdIY/Xn+elFY0QbgrjjlWqF9vFrhywAS0+1D8Dydv+FnAnAw0aPrUTevvnwgtsLN8twO1IP9PwekPRWv/mewgGqIQCcQrEl8PmB69cLe/IAAlwPEKcLFOWLvSAI1v+VswEDBgyQ4S/CMtw58cf2kAAAAABJRU5ErkJggg=='
  })
}