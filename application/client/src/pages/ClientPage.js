import { useAuth } from '../hooks/auth.hook'
import { $URL } from '../service/Service'
import MessageList from '../components/MessageList'
import '../sass/ClientPage.sass'

export default function ClientPage() {
  const question = useAuth()

  return (
    <section className="cp">
      <div className="cp_header">
        <picture className="cp_header-avatar">
          <img className="cp_header-avatarimg" src={`${$URL}/img/app/profile2.png`} alt='' />
          <div className="cp_header-avatarbg"></div>
        </picture>
      </div>
      <div className="cp_body">
        <MessageList />
      </div>
      <div className="cp_footer">
        <div className="chat_input">
          <input  className="chat_input-text" 
                  name="question" 
                  type="text" 
                  placeholder="type your question ..." 
                  required 
                  autoFocus 
                  {...question} />
          <img className="chat_input-icon2" src={`${$URL}/img/app/ok2.png`} alt='OK' />
        </div>
      </div>
    </section>
  )
}