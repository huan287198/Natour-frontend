import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../../actions/userActions';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';

function SigninScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userSignin = useSelector(state => state.userSignin);
  const { loading, userInfo, error } = userSignin;
  const dispatch = useDispatch();

  const redirect = props.location.search ? props.location.search.split("=")[1] : '/';
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
    return () => {
      //
    };
  }, [props.history, redirect, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  }
  return <div>
    <Header/>
  <main className="main">
      <div className="signup-form">
          <h2 className="heading-secondary ma-bt-lg">Đăng nhập</h2>
          <form className="form form--signup" onSubmit={submitHandler}>
              <div className="form__group">
                {loading && <div>Loading...</div>}
                {error && <div>{error}</div>}
              </div>
              <div className="form__group">
                  <label className="form__label" htmlFor="email">Email</label>
                  <input onChange={(e) => setEmail(e.target.value)} value={email} className="form__input" id="email" type="email" placeholder="you@example.com" required="required" />
              </div>
              <div className="form__group ma-bt-md">
                  <label className="form__label" htmlFor="password">Password</label>
                  <input onChange={(e) => setPassword(e.target.value)} value={password}className="form__input" id="password" type="password" placeholder="••••••••" required="required" minLength="8" />
              </div>
              <div className="form__group">
                  <button type="submit" className="btn btn--green">Đăng nhập</button>
              </div>
          </form>
      </div>
  </main>
  <Footer/>
</div>
}
export default SigninScreen;