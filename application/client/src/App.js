import './sass/LoginPage.sass'
import './sass/MainPage.sass'
import LoginPage from './pages/LoginPage'
import MainPage from './pages/MainPage'
import { Route, Switch, Redirect } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Emitter } from "./service/Service"
import useStorage from './hooks/storage.hook'

function App() {
  const [ isAuthenticated, setIsAuthenticated ] = useState(false)
  const { getCredentials } = useStorage()

  !isAuthenticated && getCredentials() && setIsAuthenticated(true)

  useEffect(() => {
    Emitter.on('authenticated', () => setIsAuthenticated(true))
  }, [])

  // console.log('App ...', isAuthenticated)

  return (
    isAuthenticated
      ? 
        <Switch>
          <Route exact path='/home' component={MainPage}/>
          <Route exact path='/login' component={LoginPage}/>
          <Redirect to='/home' />
        </Switch>
      : 
        <Switch>
          <Route exact path='/login' component={LoginPage}/>
          <Redirect to='/login' />
        </Switch>
  )
}

export default App