import React from 'react'
import {Link,withRouter} from "react-router-dom"
const currentTab = (history,path) => {
  if(history.location.pathname === path)
  {
    return {color:"#FFFFFFF"}
  }
  else{
    return {color:"#d1d1d1"}
  }
}
const Menu = ({history})=> (
      <div>
          <ul className="nav nav-tabs bg-dark">
            <li className="nav-item">
              <Link style={currentTab(history,"/")} className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link  style={currentTab(history,"/cart")}  className="nav-link" to="/cart">
              Cart
              </Link>
            </li>
            <li className="nav-item"> <Link style={currentTab(history,"/user/dashboard")}  className="nav-link" 
              to="/dashboard">
                Dashboard
                </Link>
            </li>
            <li className="nav-item">
              <Link style={currentTab(history,"/admin/Adashboard")} 
              className="nav-link" to="/Adashboard">A.Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link style={currentTab(history,"/signup")} 
              className="nav-link" to="/signup">Signup</Link>
            </li>
            <li className="nav-item">
              <Link style={currentTab(history,"/sigin")} 
               className="nav-link" to="/sigin">Signin</Link>
            </li>
            <li className="nav-item">
              <Link  style={currentTab(history,"/sigout")}
              className="nav-link" to="/signout">Signout</Link>
            </li>
          </ul>

          
      </div>
            
        )


export default withRouter(Menu);