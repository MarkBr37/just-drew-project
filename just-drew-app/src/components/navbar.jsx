import React, { Component } from 'react';
import { NavLink, Link } from "react-router-dom"

import { logout } from '../services/userService'

class NavBar extends Component {
   state = {  }
   
   render() {

     const { user } = this.props;
      return (

         <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
           <div className="container">
              <Link className="navbar-brand" to="/home">Just Drew</Link>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"   aria-expanded="false" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/my-post">My Posts<span className="sr-only">(current)</span></NavLink>
                  </li>
                  {user && 
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/favorites">Favorites<span className="sr-only">(current)</span></NavLink>
                  </li>
                  }
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/about">About</NavLink>
                  </li>
                </ul>

                <ul className="navbar-nav flote-right">
                  {user && 
                    <React.Fragment>
                      <li className="nav-item dropdown">
                        <span className="nav-link dropdown-toggle" to="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          {user.name}
                        </span>
                        <div className="dropdown-menu drm" aria-labelledby="navbarDropdown">
                          <Link className="dropdown-item" to="/profile">Profile</Link>
                          <button className="dropdown-item" onClick={logout} >Logout</button>
                        </div>
                      </li>
                    </React.Fragment>
                  }
                  {!user &&
                    <React.Fragment>
                     <li className="nav-item">
                       <NavLink className="nav-link" to="/signin">Signin<span className="sr-only">(current)</span></NavLink>
                     </li>
                     <li className="nav-item">
                       <NavLink className="nav-link" to="/signup">Signup</NavLink>
                     </li>
                    </React.Fragment>
                  }
                </ul>
              </div>
            </div>
         </nav>
      );
   }
}
 
export default NavBar;