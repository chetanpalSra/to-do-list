import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Navbar(props) {
  let location = useLocation();
  const navigate = useNavigate();

  const handleLogOut = ()=>{
    localStorage.removeItem('token');
    navigate('/login');
    props.showAlert('success','Logout Successful');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Navbar</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/' ? "active" : ""}`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/about' ? "active" : ""}`}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
          {!localStorage.getItem('token') && (location.pathname!=='/')? <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
           <li className="nav-item">
              <Link className="nav-link" aria-current="page" to={location.pathname === '/signup'?"/login":"/signup"}>
                <button type="button" className="btn btn-outline-light">{location.pathname === '/signup'?"Login":"Signup"}</button>
              </Link>
            </li>
            </ul>: <ul className="navbar-nav ms-auto mb-2 mb-lg-0"> <li className="nav-item">
                <button type="button" onClick={handleLogOut} className="btn btn-outline-light">Logout</button>
            </li> </ul>}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
