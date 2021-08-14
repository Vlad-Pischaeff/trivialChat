import './sass/LoginPage.sass'
import './sass/MainPage.sass'
import LoginPage from './pages/LoginPage'
import MainPage from './pages/MainPage'
import { Route, Switch, Redirect } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Emitter, $G } from "./service/Service"
import { useStorage } from './hooks/storage.hook'

function App() {
  const [ isAuthenticated, setIsAuthenticated ] = useState(false)
  const { getCredentials } = useStorage()

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

  console.log('App ...', isAuthenticated, $G)

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