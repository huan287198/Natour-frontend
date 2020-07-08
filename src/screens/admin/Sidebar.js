import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import { logout } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

export default function Sidebar(props) {
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const dispatch = useDispatch();
    
    const handleLogout = () => {
        dispatch(logout());
        props.history.push(`/login`);
    }
    return (
        <div className="sidebar" data-color="orange" data-background-color="black"
     data-image="assets/img/sidebar-1.jpg">
    
    <div className="logo">
        <a href="!>" className="simple-text logo-mini">
            Admin
        </a>
        <a href="!" className="simple-text logo-normal">
            My Blog
        </a>
    </div>
    <div className="sidebar-wrapper">
        <div className="user">
            <div className="photo">
                <img src={`http://localhost:5000/img/users/${userInfo.data.user.photo}`} alt="user"/>
            </div>
            <div className="user-info">
                <a data-toggle="collapse" className="username" href="!">
                    <span>
                    {userInfo.data.user.name}
                        <b className="caret"></b>
                    </span>
                </a>
                <div className="collapse" id="collapseExample">
                    <ul className="nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/profile">
                                <span className="sidebar-mini"> MP </span>
                                <span className="sidebar-normal"> My Profile </span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='' onClick={handleLogout}>
                                <span className="sidebar-mini"> LO </span>
                                <span className="sidebar-normal"> Logout </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <ul className="nav">
            <li className={`${props.history.location.pathname === '/dashboard' ? 'active nav-item' : 'nav-item'}`}>
                <Link className="nav-link " to="/dashboard">
                    <i className="material-icons">dashboard</i>
                    <p> Dashboard </p>
                </Link>
            </li>
            <li className={`${props.history.location.pathname === '/bookings' ? 'active nav-item' : 'nav-item'}`}>
                <Link className="nav-link " to="/admin/bookings">
                    <i className="material-icons">timeline</i>
                    <p> Bookings </p>
                </Link>
            </li>
            <li className={`${props.history.location.pathname === '/users' ? 'active nav-item' : 'nav-item'}`}>
                <Link className="nav-link " to="/users">
                    <i className="material-icons">date_range</i>
                    <p> Users </p>
                </Link>
            </li>
            <li className={`${props.history.location.pathname === '/tours' ? 'active nav-item' : 'nav-item'}`}>
                <Link className="nav-link " to="/tours">
                    <i className="material-icons">dashboard</i>
                    <p> Tours </p>
                </Link>
            </li>
            <li className={`${props.history.location.pathname === '/reviews' ? 'active nav-item' : 'nav-item'}`}>
                <Link className="nav-link " to="/reviews">
                    <i className="material-icons">dashboard</i>
                    <p> Reviews </p>
                </Link>
            </li>
            
        </ul>
    </div>
</div>

    )
}
