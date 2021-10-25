import { $currPage } from "../service/Service"

export default function Header() {

  return (
    <header> 
      { 
        $currPage === 'LOGIN'
          ? <p>register page</p>
          : <p>main page</p>
      }
    </header>
  )
}