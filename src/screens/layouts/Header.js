import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { logout } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

function Header(props) {
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const dispatch = useDispatch();

    const loginRegLink = (
        <nav className="nav nav--user">
            <Link className="nav__el" to="/login">Đăng nhập</Link>
            <Link className="nav__el nav__el--cta" to="/register">Đăng ký</Link>
        </nav>
    )
    
    let userLink = (
        <div></div>
    )
    
    const handleLogout = () => {
        dispatch(logout());
        props.history.push(`/login`);
    }

    if(userInfo) {
        const srcPhoto = `http://localhost:5000/img/users/${userInfo.data.user.photo}`;
        userLink = (
            <nav className="nav nav--user">
                {/* {
                    userInfo.data.user.role === 'admin' ? 
                    <Link className="nav__el" to="/admin/dashboard">
                        Dashboard
                    </Link> : null
                } */}
                <button type="button" onClick={handleLogout} className="nav__el nav__el--logout">Đăng xuất</button>
                
                <Link className="nav__el" to="/profile">
                    <img className="nav__user-img" src={srcPhoto} alt="user" />
                    <p>{userInfo.data.user.name}</p>
                </Link>
            </nav>
        )
    }

    return (
        <header className="header">
            <nav className="nav nav--tours">
                <Link className="nav__el" to="/">Trang chủ</Link>
            </nav>
            <div className="header__logo">
                <img src="/img/logo-white.png" alt="Natours logo" />
            </div>
            {userInfo ? userLink : loginRegLink }
            
        </header>
    );
}
  
export default withRouter(Header);
  