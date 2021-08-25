import { Link, useLocation } from "react-router-dom"

export default function Templates() {
  const location  = useLocation()

  // console.log('Templates location...', location)

  return (
    <div className="templates">
      <Link to={{ pathname: "/modal", state: { background: location }}}>Modal Page</Link>
      {/* <Link to="/client">Client Page</Link> */}
      <a href="http://localhost:5000/tchat">Client Page</a>
    </div>
  )
}