import { useAuth } from '../hooks/auth.hook'
import { $URL } from '../service/Service'
import '../sass/ClientPage.sass'

export default function ClientPage() {
  const question = useAuth()

  return (
    <section className="cp">
      <div className="cp_header">

      </div>
      <div className="cp_body">

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