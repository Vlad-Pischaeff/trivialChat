const httpPrefix = window.location.protocol
let { hostname } = window.location  
const URL = `${httpPrefix}//${hostname}:5000`

export default function MainPage() {

  console.log('MainPage render ...')

  return (
    <>
    <div className="wrap">
    <aside className="laside">
      <div className="profile">
        <img className="profile_img" src={`${URL}/img/app/profile2.png`} />
      </div>
      <img className="settings_img" src={`${URL}/img/app/settings.svg`} />
    </aside>
    <main className="main"> 
      <section className="logo">
        <p className="logo_text">TRIVIAL CHAT</p>
      </section>
      <header> 
        <p>main page</p>
      </header>
      <section className="main_container">
        <div className="clients">
          <div className="clients_item">
            <div className="clients_item-img">
              <div className="clients_item-img-pulse"></div><img className="clients_item-img-img" src={`${URL}/img/users/user01.png`} />
            </div>
            <div className="clients_item-status">Banjo 1</div>
          </div>
          <div className="clients_item"> 
            <div className="clients_item-img">
              <div className="clients_item-img-pulse pulse"></div><img className="clients_item-img-img" src={`${URL}/img/users/user02.png`} />
            </div>
            <div className="clients_item-status">Banjo 2</div>
          </div>
          <div className="clients_item"> 
            <div className="clients_item-img">
              <div className="clients_item-img-pulse"></div><img className="clients_item-img-img" src={`${URL}/img/users/user03.png`} />
            </div>
            <div className="clients_item-status">Banjo 3</div>
          </div>
          <div className="clients_item"> 
            <div className="clients_item-img">
              <div className="clients_item-img-pulse"></div><img className="clients_item-img-img" src={`${URL}/img/users/user04.png`} />
            </div>
            <div className="clients_item-status">Banjo 4</div>
          </div>
          <div className="clients_item"> 
            <div className="clients_item-img">
              <div className="clients_item-img-pulse"></div><img className="clients_item-img-img" src={`${URL}/img/users/user05.png`} />
            </div>
            <div className="clients_item-status">Banjo 5</div>
          </div>
          <div className="clients_item"> 
            <div className="clients_item-img">
              <div className="clients_item-img-pulse"></div><img className="clients_item-img-img" src={`${URL}/img/users/user06.png`} />
            </div>
            <div className="clients_item-status">Banjo 6</div>
          </div>
          <div className="clients_item"> 
            <div className="clients_item-img">
              <div className="clients_item-img-pulse"></div><img className="clients_item-img-img" src={`${URL}/img/users/user07.png`} />
            </div>
            <div className="clients_item-status">Banjo 7</div>
          </div>
          <div className="clients_item"> 
            <div className="clients_item-img">
              <div className="clients_item-img-pulse"></div><img className="clients_item-img-img" src={`${URL}/img/users/user08.png`} />
            </div>
            <div className="clients_item-status">Banjo 8</div>
          </div>
          <div className="clients_item"> 
            <div className="clients_item-img">
              <div className="clients_item-img-pulse"></div><img className="clients_item-img-img" src={`${URL}/img/users/user09.png`} />
            </div>
            <div className="clients_item-status">Banjo 9</div>
          </div>
          <div className="clients_item"> 
            <div className="clients_item-img">
              <div className="clients_item-img-pulse"></div><img className="clients_item-img-img" src={`${URL}/img/users/user10.png`} />
            </div>
            <div className="clients_item-status">Banjo 10</div>
          </div>
          <div className="clients_item"> 
            <div className="clients_item-img">
              <div className="clients_item-img-pulse"></div><img className="clients_item-img-img" src={`${URL}/img/users/user11.png`} />
            </div>
            <div className="clients_item-status">Banjo 11</div>
          </div>
        </div>
        <div className="chat">
          <div className="chat_field">
            <div className="chat_field-message"> 
              <p className="msg-data">date 20-07-2021</p>
              <p className="msg-text">Banjo tote bag bicycle rights, High Life sartorial cray craft beer whatever street art fap</p>
            </div>
            <div className="chat_field-message"> 
              <p className="msg-data">date 20-07-2021</p>
              <p className="msg-text">Banjo tote bag bicycle rights, High Life sartorial cray craft beer whatever street art fap</p>
            </div>
            <div className="chat_field-message"> 
              <p className="msg-data">date 20-07-2021</p>
              <p className="msg-text">Banjo tote bag bicycle rights, High Life sartorial cray craft beer whatever street art fap</p>
            </div>
            <div className="chat_field-message"> 
              <p className="msg-data">date 20-07-2021</p>
              <p className="msg-text">Banjo tote bag bicycle rights, High Life sartorial cray craft beer whatever street art fap</p>
            </div>
            <div className="chat_field-message"> 
              <p className="msg-data">date 20-07-2021</p>
              <p className="msg-text">Banjo tote bag bicycle rights, High Life sartorial cray craft beer whatever street art fap</p>
            </div>
            <div className="chat_field-message"> 
              <p className="msg-data">date 20-07-2021</p>
              <p className="msg-text">Banjo tote bag bicycle rights, High Life sartorial cray craft beer whatever street art fap</p>
            </div>
            <div className="chat_field-message"> 
              <p className="msg-data">date 20-07-2021</p>
              <p className="msg-text">Banjo tote bag bicycle rights, High Life sartorial cray craft beer whatever street art fap</p>
            </div>
            <div className="chat_field-message"> 
              <p className="msg-data">date 20-07-2021</p>
              <p className="msg-text">Banjo tote bag bicycle rights, High Life sartorial cray craft beer whatever street art fap</p>
            </div>
            <div className="chat_field-message"> 
              <p className="msg-data">date 20-07-2021</p>
              <p className="msg-text">Banjo tote bag bicycle rights, High Life sartorial cray craft beer whatever street art fap</p>
            </div>
          </div>
          <div className="chat_input">
            <input className="chat_input-text" type="text" placeholder="type your answer ..." required autoFocus/><img className="chat_input-icon" src={`${URL}/img/app/ok.png`}/><img className="chat_input-icon" src={`${URL}/img/app/attach.png`}/>
          </div>
          <div id="divider" draggable="true"></div>
        </div>
        <div className="templates"></div>
      </section>
    </main>
  </div>
  <footer> 
    <p>Trivial Chat 2021 &copy;</p>
  </footer>
  </>
  )
}