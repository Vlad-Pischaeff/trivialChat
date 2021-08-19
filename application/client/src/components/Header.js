import { $G } from "../service/Service"

export default function Header() {

  return (
    <header> 
      { 
        $G.PAGE === 'LOGIN'
          ? <p>register page</p>
          : <p>main page</p>
      }
    </header>
  )
}