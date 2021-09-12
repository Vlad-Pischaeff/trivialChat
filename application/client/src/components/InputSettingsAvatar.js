import { $URL, $G } from '../service/Service'

export default function InputSettingsAvatar() {

  return (
    <div className="pos-rel">
        <img className="forms_avatar-img" src={$G.ACC.avatar ? $G.ACC.avatar :`${$URL}/img/app/profile2.png`} alt=''/>
    </div>
  )
}