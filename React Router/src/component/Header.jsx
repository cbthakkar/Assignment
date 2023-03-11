import React from 'react'
import { Link, NavLink,useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

function Header() {

  const redirect=useNavigate(); 
    function logout()
    {
        localStorage.removeItem('email');
        swal("Success", "Logout Success", "success");
        redirect('/login')
    } 

  return (
    <>
      {/* header section start */}
      <div className="header_section">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="logo"><NavLink to="/index"><img src="images/logo.png" /></NavLink></div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/index">Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/services">services</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/about">About</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/shop">Shop</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/contact">Contact</NavLink>
                </li>
                {/* <li className="nav-item">
                  <NavLink className="nav-link" to="/login">Login</NavLink>
                </li> */}
                {(() => {
                  if (localStorage.getItem('email')) {
                    return (
                      <NavLink to="/login" onClick={logout} className="nav-item nav-link">Logout</NavLink>
                    )
                  }
                  else {
                    return (
                      <NavLink to="/login" className="nav-item nav-link">Login</NavLink>
                    )
                  }
                })
                  ()
                }
              </ul>
              <form className="form-inline my-2 my-lg-0">
                <h1 className="call_text">Call Us : +01 1234567890</h1>
              </form>
              <div className="search_icon">
                <ul>
                  <li><a href="#"><img src="images/search-icon.png" /></a></li>
                  <li><a href="#">LOGIN</a></li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
      {/* header section end */}

    </>
  )
}

export default Header