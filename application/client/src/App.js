
import { Route, Switch, Redirect, useLocation } from 'react-router-dom'
import { $currPage } from "./service/Service"
import { Emitter } from './service/ServiceEmitter'
import { useStorage } from './hooks/storage.hook'
import LoginPage from './pages/LoginPage'
import MainPage from './pages/MainPage'
import FirstSettingsPage from './pages/FirstSettingsPage'
import SettingsPage from './pages/SettingsPage'
import Tip from './components/Tip'
import SettingsCropImage from './pages/SettingsCropImage'
import MessagePage from './pages/MessagePage'

function App() {
  const location = useLocation()
  const background = location.state && location.state.background
  const { getCredentials } = useStorage()
  
  // console.log('App ...', $currPage, background, location)

  if (getCredentials() && $currPage !== 'MAIN') {
    Emitter.emit('authenticated')
  }

  return (
    <>
    {
      $currPage === 'MAIN'
        ? 
          <>
            <Switch location={background || location}>
              <Route exact path='/home' component={MainPage}/>
              <Route exact path='/login' component={LoginPage}/>
              <Route exact path='/modaladdr' component={FirstSettingsPage}/>
              <Route exact path='/settings' component={SettingsPage}/>
              <Route exact path='/cropimage' component={SettingsCropImage}/>
              <Route exact path='/support' component={MessagePage}/>
              <Redirect to='/home' />
            </Switch>
            {
              background && 
                <Switch>
                  <Route exact path='/modaladdr' component={FirstSettingsPage}/>
                  <Route exact path='/settings' component={SettingsPage}/>
                  <Route exact path='/cropimage' component={SettingsCropImage}/>
                  <Route exact path='/support' component={MessagePage}/>
                </Switch>
            }
          </>
        : 
          <Switch>
            <Route exact path='/login' component={LoginPage}/>
            <Redirect to='/login' />
          </Switch>
    }
    <Tip />
    </>
  )
}

export default App