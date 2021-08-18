import { $G } from "../service/Service"
import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const location = useLocation()

  console.log('Header location...', location)
  
  return (
    <header> 
      { 
        $G.PAGE === 'LOGIN'
          ? <p>register page</p>
          : <>
              <Link to={{ pathname: "/modal", state: { background: location }}}>Modal Page</Link>
              <p>main page</p>
            </>
      }
    </header>
  )
}