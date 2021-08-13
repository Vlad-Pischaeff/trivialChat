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

  if (!isAuthenticated) {           /* if has credentials in sessionStorage */
    if (getCredentials()) {         /* get this credentials */
      setIsAuthenticated(true)      /* set FLAG isAuthenticated to TRUE */
      $G.PAGE = 'MAIN'              /* use MAIN page */
    }
  } 

  useEffect(() => {
    Emitter.on('authenticated', (data) => {
      $G.ACC = data
      $G.PAGE = 'MAIN'
      setIsAuthenticated(true)
    })
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