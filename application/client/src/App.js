
import { Route, Switch, Redirect, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Emitter, $G } from "./service/Service"
import { useStorage } from './hooks/storage.hook'
import LoginPage from './pages/LoginPage'
import MainPage from './pages/MainPage'
import FirstSettingsPage from './pages/FirstSettingsPage'
import SettingsPage from './pages/SettingsPage'
import Tip from './components/Tip'
import SettingsCropImage from './pages/SettingsCropImage'
import MessagePage from './pages/MessagePage'

function App() {
  const [ isAuthenticated, setIsAuthenticated ] = useState(false)
  const { getCredentials } = useStorage()
  const location = useLocation()
  const background = location.state && location.state.background

  const setAuth = () => {
    setIsAuthenticated(true)                    /* set FLAG isAuthenticated to TRUE */
    $G.PAGE = 'MAIN'                            /* set MAIN page */
  }

  if (!isAuthenticated && getCredentials()) {   /* if has credentials in sessionStorage */
    setAuth()             
  } 

  useEffect(() => {
    Emitter.on('authenticated', setAuth)
  }, [])

  // console.log('App ...', isAuthenticated, $G, background, location)

  return (
    <>
    {
      isAuthenticated
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