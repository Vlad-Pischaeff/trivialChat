import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router'
import { $G } from '../service/Service'
import ButtonSave from '../components/ButtonSave'
import ButtonCloseStd from '../components/ButtonCloseStd'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

export default function SettingsCropImage() {
  const location = useLocation()
  const { img } = location.state
  const [ crop, setCrop ] = useState({ x: 20, y: 20, width: 80, height: 80, aspect: 1 })
  const [ completedCrop, setCompletedCrop ] = useState(null)
  const imgRef = useRef()
  const previewCanvasRef = useRef(null)
  const hiddenCanvasRef = useRef(null)

  useEffect(() => {
    if (!completedCrop || !imgRef.current) {
      return
    }
    const image = imgRef.current
    const canvas = previewCanvasRef.current
    const hcanvas = hiddenCanvasRef.current
    const crop = completedCrop
    const dpr = window.devicePixelRatio || 1

    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    const ctx = canvas.getContext('2d')
    const hctx = hcanvas.getContext('2d')

    canvas.width = crop.width * dpr
    canvas.height = crop.height * dpr

    if ((crop.width > 0) && (crop.height > 0)) {
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width * dpr,
        crop.height * dpr
      )
      hctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, 64, 64)
      $G.ACC.avatar = hcanvas.toDataURL('image/jpeg')
    }
  }, [completedCrop])

  const onLoad = useCallback(img => {imgRef.current = img}, [])

  return (
    <>
      <div className="modal_bg"></div>

      <div className='modal'>

        <section  className="modal_form" id="settings">
          <form className="forms_form hide1" id="form-imgsettings" autoComplete="off">

            <h2 className="forms_title">Set image for {$G.ACC.email}</h2>
            <div className="h-1rem"></div>

            <div className="forms_wrap">
              <section className="forms_wrap-left" >
                <canvas ref={previewCanvasRef} style={{ 'width': '15rem', 'height': '15rem', 'margin': '0 1rem'}} />
                <canvas ref={hiddenCanvasRef} style={{"display": 'none' }} width='64' height='64' />
              </section>
              <section className="forms_wrap-right">
                <ReactCrop imageStyle={{ maxHeight: '15rem', maxWidth: '23rem'}} 
                  src={img} crop={crop} ref={imgRef}
                  onImageLoaded={onLoad}
                  onComplete={crop => setCompletedCrop(crop)}
                  onChange={crop => setCrop(crop)}
                />
              </section>
            </div>

            <div className="forms_buttons">
              <ButtonSave save={["avatar"]} />
            </div>
            <ButtonCloseStd />
          </form>
        </section>

      </div>
    </>
  )
}