import React from 'react'
import { Link } from 'react-router-dom';

export default function NavBar(props) {
    const navItem = (link, text, icon, active) => (
        <li className={`${active ? 'side-nav--active' : ''}`}>
            <Link to={`${link}`}>
                <svg className="card__icon">
                    <use xlinkHref={`/img/icons.svg#icon-${icon}`}></use>
                </svg>
                {text}
            </Link>
        </li>
    )

    return (
        <nav className="user-view__menu">
            <nav className="user-view__menu">
                <ul className="side-nav">
                    {navItem('/profile', 'Settings', 'settings', props.history.location.pathname === '/profile' ? true : false)}
                    {navItem('/my-tours', 'My bookings', 'briefcase', props.history.location.pathname === '/my-tours' ? true : false)}
                    {navItem('/my-reviews', 'My reviews', 'star', props.history.location.pathname === '/my-reviews' ? true : false)}
                    {/* {navItem('/my-billings', 'Billing', 'credit-card', props.history.location.pathname === '/my-billings' ? true : false)} */}
                </ul>
                {/* <div className="admin-nav">
                    <h5 className="admin-nav__heading">Admin</h5>
                    <ul className="side-nav">
                        {navItem('/admin/tours', 'Manage tours', 'map', props.history.location.pathname === '/admin/tours' ? true : false)}
                        {navItem('#', 'Manage users', 'users')}
                        {navItem('#', 'Manage reviews', 'star')}
                        {navItem('#', 'Manage bookings', 'briefcase')}
                    </ul>
                </div> */}
            </nav>
        </nav>
    )
}
