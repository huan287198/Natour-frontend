import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import { logout } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

export default function Navbar(props) {
  const dispatch = useDispatch();
    
    const handleLogout = () => {
        dispatch(logout());
        props.history.push(`/login`);
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
  <div className="container-fluid">
    <div className="navbar-wrapper">
      <div className="navbar-minimize">
        <button id="minimizeSidebar" className="btn btn-just-icon btn-white btn-fab btn-round">
          <i className="material-icons text_align-center visible-on-sidebar-regular">more_vert</i>
          <i className="material-icons design_bullet-list-67 visible-on-sidebar-mini">view_list</i>
        </button>
      </div>
      <a className="navbar-brand" href="!#">{props.history.location.pathname === '/dashboard' ? 'Dashboard' : ""}</a>
    </div>
    <button className="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navigation-index"
      aria-expanded="false" aria-label="Toggle navigation">
      <span className="sr-only">Toggle navigation</span>
      <span className="navbar-toggler-icon icon-bar"></span>
      <span className="navbar-toggler-icon icon-bar"></span>
      <span className="navbar-toggler-icon icon-bar"></span>
    </button>
      <a className="btn btn-rose pull-right" href="!#">
          Go to HomePage
      </a>
    <div className="collapse navbar-collapse justify-content-end">
            
          <input id="txtSearch" type="text" value="" className="form-control searchInput" placeholder="Search..." name="inputSearch"/> 
          <button type="submit" className="btnSearch btn btn-white btn-round btn-just-icon" name="btnSearch" id="search">
          <i className="material-icons">search</i>
                <div className="ripple-container"></div>
          </button>
       
      <ul className="navbar-nav">
        <li className="nav-item dropdown">
          <a className="nav-link" href="#" id="navbarDropdownProfile" data-toggle="dropdown" aria-haspopup="true"
            aria-expanded="false">
            <i className="material-icons">person</i>
            <p className="d-lg-none d-md-block">
              Account
            </p>
          </a>
          <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownProfile">
            <a className="dropdown-item" href="!#">Profile</a>
            <div className="dropdown-divider"></div>
            <button type="button" onClick={handleLogout} className="dropdown-item">Log out</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</nav>
    )
}
